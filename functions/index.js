const firebase_tools = require('firebase-tools');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();

let onUserDelete = (snap, context) => {
	const user = snap.data();
	const id = user.id;


	// delete all trips owned by deleted user
	// delete all references on deleted user in tripMembers
	firestore.collection("TRIPS").get().then(snap => {
		snap.forEach(tripDoc => {
			const tripObj = tripDoc.data();
			let tripDeleted = false;
			// Search all trips owned by deleted user
			if(tripObj.owner === id)
			{
				// trip has other members -> next member becomes the owner
				if(tripObj.members[0] && tripObj.members[0]!==id)
				{
					tripObj.owner = tripObj.members[0];
					firestore.set(tripDoc.ref, tripObj) //TODO: does ref work?
				} else if(tripObj.members[1] && tripObj.members[1]!==id)
				{ // in case the (deleted) owner has been registered as the first member
					tripObj.owner = tripObj.members[1];
					firestore.set(tripDoc.ref, tripObj) //TODO: does ref work?
				} else if(tripObj.public) { // a public trip without owner or members stays public
					tripObj.owner = 'public';
					firestore.set(tripDoc.ref, tripObj) //TODO: does ref work?
				} else { // delete trip
						firestore.delete(tripDoc.ref, {
							project: process.env.GCLOUD_PROJECT,
							recursive: true,
							yes: true,
							token: functions.config().fb.token,
						})
					tripDeleted = true;
				}

				// TODO: check if it worked
			}
			if(!tripDeleted) { // unnecessary if trip has been deleted
				// delete membership of deleted user from all trips
				const members = tripObj.members;
				const index = members.indexOf(id);
				if(index >= 0) {
					members.splice(index, 1);
					tripObj.members = members;
					firestore.set(tripDoc.ref, tripObj); //TODO: Does reference work?
				}
			}
		});
	});

	// deleted all references on deleted user in followedUser
	firestore.collection("users").get().then( snap => {

		snap.forEach(userDoc => {
			const userObj = userDoc.data();
			let index = userObj.following.indexOf(user.uid);
			if(index >= 0)
			{
				userObj.splice(index, 1);
				firestore.set(userDoc.ref, userObj); // TODO: Does reference work?
			}
		});
	});
}

//
// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// 	const email = user.email;
//
// 	functions.auth.user().sendEmailVerification()
// 		.then(function () {
// 			console.log(`Verification email sent to ${email}`);
// 		}, function (error) {
// 			console.error(error);
// 		});
// });
//

exports.deleteUser = functions.firestore.document(`$/users/{userId}`).onDelete(onUserDelete);

