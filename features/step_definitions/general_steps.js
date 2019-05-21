const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const {ClientFunction} = require('testcafe');

Given('I have navigated to {string}', async function (string) {
	// @ts-ignore
	await testController.navigateTo(url(string));
});

Then('I am navigated to {string}', async function (expected) {
	const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(getLocation()).contains(expected);
});

When('I click on the {string}', async function (element) {
	// @ts-ignore
	await testController.click(select(element).with({boundTestRun: testController}));
});

Then('I cant click on {string}', async function (element) {
	const button = select(element).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(button.hasAttribute('disabled')).ok();
});

Given('I am logged in', async function () {
	// @ts-ignore
	await testController.navigateTo(url('PerfectTimeLogin'));
	// @ts-ignore
	await testController.typeText(select('email').with({boundTestRun: testController}), 'test@user.de');
	// @ts-ignore
	await testController.typeText(select('password').with({boundTestRun: testController}), 'netTest');
});

Given('I am not logged in', async function () {
	const logoutButton = select('logout').with({boundTestRun: testController});
	if (await logoutButton.exists) {
		await testController.click(logoutButton).with({boundTestRun: testController});
	}
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});

Then('There is no {string}', async function (element) {
	const addActivityButton = select(element).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(addActivityButton === null).ok();               //check if element is null not working
});

Then('I have opened a {string}', async function (site) {
	// @ts-ignore
	await testController.navigateTo(url(site));
});

Then('Wrong input is marked', async function () {
	const showWrongInput = select('...').with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(showWrongInput === 'Title needs to be defined');
});
