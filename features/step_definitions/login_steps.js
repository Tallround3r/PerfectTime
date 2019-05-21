const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;
const {ClientFunction} = require('testcafe');

Then('I insert invalid login Data', async function () {
	// @ts-ignore
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	// @ts-ignore
	await testController.typeText(select('password').with({boundTestRun: testController}), 'netTest');
});

Then('I insert valid login Data', async function () {
	// @ts-ignore
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.com');
	// @ts-ignore
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test12');
});

Then('I stay at {string}', async function (expected) {
	const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(getLocation()).contains(expected);
});
