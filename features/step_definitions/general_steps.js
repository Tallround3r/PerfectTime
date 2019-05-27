const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const {ClientFunction} = require('testcafe');

Given('I have navigated to {string}', async function (string) {
	/* eslint-disable */
	await testController.navigateTo(url(string));
	/* eslint-enable */
});

Then('I am navigated to {string}', async function (expected) {
	/* eslint-disable */
	const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
	await testController.expect(getLocation()).contains(expected);
	/* eslint-enable */
});

When('I click on the {string}', async function (element) {
	/* eslint-disable */
	await testController.click(select(element).with({boundTestRun: testController}));
	/* eslint-enable */
});

Then('I cant click on {string}', async function (element) {
	/* eslint-disable */
	const button = select(element).with({boundTestRun: testController});
	await testController.expect(button.hasAttribute('disabled')).ok();
	/* eslint-enable */
});

Given('I am logged in', async function () {
	/* eslint-disable */
	await testController.navigateTo(url('PerfectTimeLogin'));
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	await testController.typeText(select('password').with({boundTestRun: testController}), 'netTest');
	/* eslint-enable */
});

Given('I am not logged in', async function () {
	/* eslint-disable */
	const logoutButton = select('logout').with({boundTestRun: testController});
	if (await logoutButton.exists) {
		await testController.click(logoutButton).with({boundTestRun: testController});
	}
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
	/* eslint-enable */
});

Then('There is no {string}', async function (element) {
	/* eslint-disable */
	const addActivityButton = select(element).with({boundTestRun: testController});
	await testController.expect(addActivityButton === null).ok();               //check if element is null not working
	/* eslint-enable */
});

Then('I have opened a {string}', async function (site) {
	/* eslint-disable */
	await testController.navigateTo(url(site));
	/* eslint-enable */
});

Then('Wrong input is marked', async function () {
	/* eslint-disable */
	const showWrongInput = select('...').with({boundTestRun: testController});
	await testController.expect(showWrongInput === 'Title needs to be defined');
	/* eslint-enable */
});
