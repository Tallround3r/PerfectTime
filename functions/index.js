const functions = require('firebase-functions');

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	const email = user.email;

	user.sendEmailVerification().then(function () {
		console.log(`Verification email sent to ${email}`);
	}, function (error) {
		console.error(error);
	});
});

