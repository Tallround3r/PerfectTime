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
 * The calling user must be authenticated and have the custom "admin" attribute
 * set to true on the auth token.
 *
 * This delete is NOT an atomic operation and it's possible
 * that it may fail after only deleting some documents.
 *
 * @param {string} data.path the document or collection path to delete.
 */
exports.deleteTrip = functions
	.runWith({
		timeoutSeconds: 540,
		memory: '2GB',
	})
	.https.onCall((data, context) => {
		const path = data.path;
		const tripRef = firestore.doc(path);

		console.log(`User ${context.auth.uid} has requested to delete path ${path}`);

		return firestore.runTransaction((transaction) => {
			return transaction.get(tripRef)
				.then((doc) => {
					if (!doc.exists) {
						throw new functions.https.HttpsError(
							'not-found',
							'Requested Document does not exist.',
						);
					}

					const trip = doc.data();

					// Only allow authenticated users to delete a trip.
					if (!(context.auth)) {
						throw new functions.https.HttpsError(
							'unauthenticated',
							'Must be authenticated to initiate delete.',
						);
					}

					// Only allow owners of a trip to execute this function.
					if (!trip.owner || trip.owner !== context.auth.uid) {
						throw new functions.https.HttpsError(
							'permission-denied',
							'Must be the owner of the trip to initiate delete.',
						);
					}

					// Run a recursive delete on the given document or collection path.
					// The 'token' must be set in the functions config with 'firebase functions:config:set fb.token=""',
					// and can be generated at the command line by running 'firebase login:ci'.
					return firebase_tools.firestore
						.delete(path, {
							project: process.env.GCLOUD_PROJECT,
							recursive: true,
							yes: true,
							token: functions.config().fb.token,
						})
						.then(() => {
							console.log(`Trip on path ${path} successfully deleted.`);
							return {
								path: path,
							};
						});
				});
		});
	});
