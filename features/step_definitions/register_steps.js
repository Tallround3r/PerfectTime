const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

Then('There is a {string} called {string}', async function (element, expected) {
	const button = select(element).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(button === expected);
});

// normally And
Then('I insert invalid Data', async function () {
	// @ts-ignore
	await testController.typeText(select('first name').with({boundTestRun: testController}), 'test');
	// @ts-ignore
	await testController.typeText(select('last name').with({boundTestRun: testController}), 'test');
	// @ts-ignore
	await testController.typeText(select('username').with({boundTestRun: testController}), 'testUser');
	// @ts-ignore
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	// @ts-ignore
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test');
	// @ts-ignore
	await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), 'notest');
});

// normally And
Then('I insert valid Data', async function () {
	// @ts-ignore
	await testController.typeText(select('first name').with({boundTestRun: testController}), 'test');
	// @ts-ignore
	await testController.typeText(select('last name').with({boundTestRun: testController}), 'test');
	// @ts-ignore
	await testController.typeText(select('username').with({boundTestRun: testController}), 'testUser');
	// @ts-ignore
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.com');
	// @ts-ignore
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test12');
	// @ts-ignore
	await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), 'test12');
});
