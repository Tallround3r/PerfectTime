import * as functions from "firebase";

const functions = require('firebase-functions');

let onUserDelete = (snap, context) => {
	const user = snap.data();
	const id = user.id;
	const users = functions.firestore.

	//delete all trips owned by deleted user


	// deleted all references on deleted user in followedUser


	// delete all references on deleted user in tripMembers



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

