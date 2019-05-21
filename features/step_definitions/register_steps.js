const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

Then('There is a {string} called {string}', async function (element, expected) {
	/* eslint-disable */
	const button = select(element).with({boundTestRun: testController});
	await testController.expect(button === expected);
	/* eslint-enable */
});

// normally And
Then('I insert invalid Data', async function () {
	/* eslint-disable */
	await testController.typeText(select('first name').with({boundTestRun: testController}), 'test');
	await testController.typeText(select('last name').with({boundTestRun: testController}), 'test');
	await testController.typeText(select('username').with({boundTestRun: testController}), 'testUser');
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test');
	await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), 'notest');
	/* eslint-enable */
});

// normally And
Then('I insert valid Data', async function () {
	/* eslint-disable */
	await testController.typeText(select('first name').with({boundTestRun: testController}), 'test');
	await testController.typeText(select('last name').with({boundTestRun: testController}), 'test');
	await testController.typeText(select('username').with({boundTestRun: testController}), 'testUser');
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.com');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test12');
	await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), 'test12');
	/* eslint-enable */
});
