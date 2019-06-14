const firebase_tools = require('firebase-tools');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	const email = user.email;

	functions.auth.user().sendEmailVerification()
		.then(() => {
			console.log(`Verification email sent to ${email}`);
			return Promise.resolve();
		})
		.catch(() => {
			console.error(error);
			return Promise.reject(error);
		});
});

/**
 * From Firebase docs:
 *
 * Initiate a recursive delete of documents at a given path.
 *
 * This delete is NOT an atomic operation and it's possible
 * that it may fail after only deleting some documents.
 *
 * @param {string} data.path the document or collection path to delete.
 */
exports.onDeleteTrip = functions
	.runWith({
		timeoutSeconds: 300,
		memory: '1GB',
	})
	.firestore.document('TRIPS/{tripId}')
	.onDelete((snap, context) => {
		const path = snap.ref.path;

		console.log(`Triggered recursive delete of Subcollections of Trip '${snap.data().title}' with ID '${snap.id}'`);

		// Run a recursive delete on the given document or collection path.
		// The 'token' must be set in the functions config with 'firebase functions:config:set fb.token=""'
		// and can be generated at the command line by running 'firebase login:ci'.
		return firebase_tools.firestore
			.delete(path, {
				project: process.env.GCLOUD_PROJECT,
				recursive: true,
				yes: true,
				token: functions.config().fb.token,
			})
			.then((promise) => {
				console.log(`Subcollections on path ${path} successfully deleted.`);
				return promise;
			});
	});

const onDeleteUsers = (snap, context) => {
	const firestore = admin.firestore();
	const user = snap.data();
	const id = snap.id;
	console.log(`User deletion for ${id} triggered.`);
	// console.log(`Firestore Ref: ${firestore} ${firestore.delete()} ind: ${firebase_tools.firestore.delegate()}`);
	// delete all trips owned by deleted user
	// delete all references on deleted user in tripMembers
	firestore.collection('TRIPS').get()
		.then((snap) => {
			console.log(`fetched ${snap} trips`);
			snap.forEach(tripDoc => {
				const tripObj = tripDoc.data();
				console.log(`looking at ${tripObj.title} ID: ${tripDoc.id} data: ${tripObj}`);
				let tripDeleted = false;
				// Search all trips owned by deleted user
				if (tripObj.owner === id) {
					console.log(`Trip Owner ${tripObj.owner} identified`);
					// trip has other members -> next member becomes the owner
					if (tripObj.members && tripObj.members[0] !== id) {
						console.log(`Set new Owner to ${tripObj.members[0]} trips`);
						tripObj.owner = tripObj.members[0];
						firestore.collection('TRIPS').doc(tripDoc.id).set(tripObj).then((promise) => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return promise;
						}).catch((error) => {
							console.error(`an error occurred while editing trip ${tripDoc.path} (1) Error: ${error}`);
						});
					} else if (tripObj.members && tripObj.members[1] !== id) {
						// in case the (deleted) owner has been registered as the first member
						tripObj.owner = tripObj.members[1];
						console.log(`Set new Owner to ${tripObj.members[0]} trips`);
						firestore.collection('TRIPS').doc(tripDoc.id).set(tripObj).then((promise) => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return promise;
						}).catch((error) => {
							console.error(`an error occurred while editing trip ${tripDoc.path} (2) Error: ${error}`);
						});
					} else {
						// delete trip; // fully recursive
						console.log(`deleting trip ${tripDoc.ref.path}`);
						firestore.collection('TRIPS').doc(tripDoc.id).delete().then(() => {
							tripDeleted = true;
						}).catch((error) => {
							console.error(`Error during deletion ${error}`);
						}); // triggers delete trip

						console.log(`trip ${tripDoc.ref.path} deleted`);
					}
				}

				// unnecessary if trip has been deleted
				// delete membership of deleted user from all trips
				if (!tripDeleted) {
					const members = tripObj.members;
					const index = members ? members.indexOf(id) : -1;
					console.log(`User identified as TripMember at Pos ${index} of Trip ${tripObj.title}`);
					if (index >= 0) {
						console.log(`trip ${tripDoc.id} had user as member`);
						members.splice(index, 1);
						tripObj.members = members;
						firestore.collection('TRIPS').doc(tripDoc.id).set(tripObj).then(() => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return Promise.resolve();
						}).catch((error) => {
							console.error(`an error occurred while editing trip ${tripDoc.path} (3) Error: ${error}`);
						});
					}
				}
			});

			return Promise.resolve();
		})
		.catch((error) => console.error(`Error while fetching TRIPS from firestore Error: ${error}`));

	// delete all references on deleted user in followedUser
	firestore.collection('users').get()
		.then((snap) => {
			console.log(`loaded users`);
			snap.forEach(userDoc => {
				const userObj = userDoc.data();
				let index = userObj.following ? userObj.following.indexOf(user.uid) : -1;
				console.log(`Deleted user found at Pos ${index} in User ${userObj.username}`);
				if (index >= 0) {
					console.log(`User ${userDoc.id} followed deleted user (Index: ${index})`);
					userObj.splice(index, 1);
					firestore.collection('users').doc(userDoc.id).set(userObj).then(() => {
						console.log(`user  on path ${userDoc.ref.path} successfully updated.`);
						return Promise.resolve();
					}).catch((error) => {
						console.error(`an error occurred while editing user ${userDoc.path} Error: ${error}`);
					});
				}
			});
			return Promise.resolve();
		})
		.catch((error) => console.error(`Error while fetching users from firestore. Error: ${error}`));
	return Promise.resolve();
};

exports.onDeleteUser = functions.firestore.document(`users/{userId}`).onDelete(onDeleteUsers);
