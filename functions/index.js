const firebase_tools = require('firebase-tools');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();


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
	const user = snap.data();
	const id = snap.id;

	// delete all trips owned by deleted user
	// delete all references on deleted user in tripMembers
	firestore.collection('TRIPS').get()
		.then((snap) => {
			console.log(`fetched ${snap.left} trips`);
			snap.forEach(tripDoc => {
				const tripObj = tripDoc.data();
				console.log(`looking at ${tripObj.title} ID: ${tripDoc.id} data: ${tripObj}`);
				let tripDeleted = false;
				// Search all trips owned by deleted user
				if (tripObj.owner === id) {
					console.log(`Trip Owner ${tripDoc.owner} identified`);
					// trip has other members -> next member becomes the owner
					if (tripObj.members && tripObj.members[0] !== id) {
						console.log(`Set new Owner to ${tripObj.members[0]} trips`);
						tripObj.owner = tripObj.members[0];
						firestore.set(tripDoc.ref, tripObj).then((promise) => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return promise;
						}).catch((error)=>{`an error occurred while editing trip ${tripDoc.path} (1) Error: ${error}`}); //TODO: does ref work?
					} else if (tripObj.members && tripObj.members[1] !== id) {
						// in case the (deleted) owner has been registered as the first member
						tripObj.owner = tripObj.members[1];
						console.log(`Set new Owner to ${tripObj.members[0]} trips`);
						firestore.set(tripDoc.ref, tripObj).then((promise) => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return promise;
						}).catch((error)=>{`an error occurred while editing trip ${tripDoc.path} (2) Error: ${error}`}); //TODO: does ref work?
					} else {
						// delete trip;
						console.log(`deleting trip ${tripDoc.path}`);
						firestore.delete(tripDoc.ref); // triggers delete trip
						tripDeleted = true;
						console.log(`trip ${tripDoc.path} deleted`);
					}

					// TODO: check if it worked
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
						firestore.set(tripDoc.ref, tripObj).then(() => {
							console.log(`Trip  on path ${tripDoc.path} successfully updated.`);
							return Promise.resolve();
						}).catch((error)=>{`an error occurred while editing trip ${tripDoc.path} (3) Error: ${error}`}); //TODO: Does reference work?
					}
				}
			});

			return Promise.resolve();
		})
		.catch(() => console.log('Error while fetching TRIPS from firestore'));

	// delete all references on deleted user in followedUser
	firestore.collection('users').get()
		.then((snap) => {
			console.log(`loaded users`);
			snap.forEach(userDoc => {
				const userObj = userDoc.data();
				console.log(`User loaded ${userObj.username} with ref ${userDoc.ref}`);
				let index = userObj.following ? userObj.following.indexOf(user.uid) : -1;
				if (index >= 0) {
					console.log(`User ${userDoc.id} followed deleted user (Index: ${index})`);
					userObj.splice(index, 1);
					firestore.set(userDoc.ref, userObj).then(() => {
						console.log(`user  on path ${userDoc.path} successfully updated.`);
						return Promise.resolve();
					}).catch((error)=>{`an error occurred while editing user ${userDoc.path} Error: ${error}`}); // TODO: Does reference work?
				}
			});
			return Promise.resolve();
		})
		.catch((error) => console.error(`Error while fetching users from firestore. Error: ${error}`));
	return Promise.resolve();
};

exports.onDeleteUser = functions.firestore.document(`users/{userId}`).onDelete(onDeleteUsers);
