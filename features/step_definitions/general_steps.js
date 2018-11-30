const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

Given('I have navigated to {string}', async function (string) {
    await testController.navigateTo(url(string));
});

When('I click on the {string}', async function (element) {
    await testController.click(select(element).with({boundTestRun: testController}));
});

Then('I cant click on {string}', async function (element) {
    const signUpButton = select(element).with({boundTestRun: testController});
    await testController.expect(signUpButton.hasAttribute('disabled')).ok();
});

Then('I am navigated to {string}', async function (expected) {
    const getLocation = ClientFunction(() => document.location.href).with({boundTestRun: testController});
    await testController.expect(getLocation()).contains(expected);
});

Given('I am not logged in', async function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

Given('I am logged in', async function () {
    await testController.navigateTo(url("PerfectTimeLogin"));
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.de");
    await testController.typeText(select('password').with({boundTestRun: testController}), "netTest");
});
