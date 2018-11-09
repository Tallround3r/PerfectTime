const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

Given('I have navigated to {string}', async function (string) {
    await testController.navigateTo(url(string));
});

Then('the {string} should be {string}', async function (element, expected) {
    const title = select(element).with({boundTestRun: testController});
    await testController.expect(title === expected)
});
