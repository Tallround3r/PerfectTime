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
			if(tripObj.owner === id)
			{
				// TODO: call delete Trip
			}
			else {
				const members = tripObj.members;
				const index = members.indexOf(id);
				if(index >= 0) {
					members.splice(index, 1);
					tripObj.members = members;
					firestore.set(tripDoc.reference, tripObj); //TODO: Does reference work?
				}

			}

		})
	});

	// deleted all references on deleted user in followedUser
	firestore.collection("users").get().then( snap => {

		snap.forEach(userDoc => {
			const userObj = userDoc.data();
			let index = userObj.following.indexOf(user.uid);
			if(index >= 0)
			{
				userObj.splice(index, 1);
				firestore.set(userDoc.reference, userObj); // TODO: Does reference work?
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

