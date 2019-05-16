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
