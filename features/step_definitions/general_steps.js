const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const {ClientFunction} = require('testcafe');

Given('I have navigated to {string}', async function (string) {
    await testController.navigateTo(url(string));
});

Then('I am navigated to {string}', async function (expected) {
    const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
    await testController.expect(getLocation()).contains(expected);
});

When('I click on the {string}', async function (element) {
    await testController.click(select(element).with({boundTestRun: testController}));
});

Then('I cant click on {string}', async function (element) {
    const signUpButton = select(element).with({boundTestRun: testController});
    await testController.expect(signUpButton.hasAttribute('disabled')).ok();
});

Given('I am logged in', async function () {
    await testController.navigateTo(url("PerfectTimeLogin"));
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.de");
    await testController.typeText(select('password').with({boundTestRun: testController}), "netTest");
});

Given('I am not logged in', async function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

Then('There is no {string}', async function (element) {
    addActivityButton = select(element).with({boundTestRun: testController});
    await testController.expect(addActivityButton === null).ok();               //check if element is null not working
});

Then('I have opened a {string}', async function (site) {
    await testController.navigateTo(url(site));
});

Then('Wrong input is marked', async function () {
    showWrongInput = select("...").with({boundTestRun: testController});
    await testController.expect(showWrongInput === "Title needs to be defined");
});
