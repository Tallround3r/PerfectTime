const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;
const {ClientFunction} = require('testcafe');

Then('I insert invalid login Data', async function () {
	/* eslint-disable */
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'netTest');
	/* eslint-enable */
});

Then('I insert valid login Data', async function () {
	/* eslint-disable */
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.com');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test12');
	/* eslint-enable */
});

Then('I stay at {string}', async function (expected) {
	/* eslint-disable */
	const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
	await testController.expect(getLocation()).contains(expected);
	/* eslint-enable */
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'netTest');
});

Then('I insert valid login Data', async function () {
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.com');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'test12');
});

Then('I stay at {string}', async function (expected) {
	const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
	await testController.expect(getLocation()).contains(expected);
});
