const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const { ClientFunction } = require('testcafe');

Given('I have opened to {string}', async function (string) {
    await testController.navigateTo(url(string));
});

Given('I am not logged in', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

Then('There is a {string} called {string}', async function (element, expected) {
    const button = select(element).with({boundTestRun: testController});
    await testController.click(button);
    await testController.expect(button === expected);
});

Then('I can see the {string} called {string}', async function (element, expected) {
    const loginHeader = select(element).with({boundTestRun: testController});
    await testController.expect(loginHeader === expected);
});

When('I click on the {string}', async function (element) {
    await testController.click(select(element).with({boundTestRun: testController}));
});

Then('The {string} called {string} shows up', async function (element, expected) {
    const registerHeader = select(element).with({boundTestRun: testController});
    await testController.expect(registerHeader === expected);
});

// normally And
Then('I insert invalid Data', async function () {
    await testController.typeText(select('first name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('last name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('username').with({boundTestRun: testController}), "testUser");
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.de");
    await testController.typeText(select('password').with({boundTestRun: testController}), "test");
    await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), "notest");
});

Then('I cant click on {string}', async function (element) {
    const signUpButton = select(element).with({boundTestRun: testController});
    await testController.expect(signUpButton.hasAttribute('disabled')).ok();
});

// normally And
Then('I insert valid Data', async function () {
    await testController.typeText(select('first name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('last name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('username').with({boundTestRun: testController}), "testUser");
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.com");
    await testController.typeText(select('password').with({boundTestRun: testController}), "test12");
    await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), "test12");
});

// normally And
Then('I click on {string}', async function (element) {
    await testController.click(select(element).with({boundTestRun: testController}));
});

Then('I insert invalid login Data', async function () {
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.de");
    await testController.typeText(select('password').with({boundTestRun: testController}), "netTest");
});

Then('I stay at {string}', async function (expected) {
    const getLocation = ClientFunction(() => document.location.href);
    await testController.expect(getLocation()).contains(expected);
});

