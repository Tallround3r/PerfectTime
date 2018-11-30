const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const { ClientFunction } = require('testcafe');

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
