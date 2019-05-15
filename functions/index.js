const functions = require('firebase-functions');

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	const email = user.email;

	functions.auth.user().sendEmailVerification()
		.then(function () {
			console.log(`Verification email sent to ${email}`);
		}, function (error) {
			console.error(error);
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
exports.recursiveDelete = functions
	.runWith({
		timeoutSeconds: 540,
		memory: '2GB'
	})
	.https.onCall((data, context) => {
		const path = data.path;

		// TODO: get owner of trip

		console.log(
			`User ${context.auth.uid} has requested to delete path ${path}`
		);

		// TODO: Only allow owners of a trip to execute this function.
		if (!(context.auth && context.auth.token && context.auth.token.admin)) {
			throw new functions.https.HttpsError(
				'permission-denied',
				'Must be the owner of the trip to initiate delete.'
			);
		}

		// Run a recursive delete on the given document or collection path.
		// The 'token' must be set in the functions config, and can be generated
		// at the command line by running 'firebase login:ci'.
		return firebase_tools.firestore
			.delete(path, {
				project: process.env.GCLOUD_PROJECT,
				recursive: true,
				yes: true,
				token: functions.config().fb.token
			})
			.then(() => {
				return {
					path: path
				};
			});
	});
