const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

Given('ich befinde mich auf der {string}', async function (string) {
    await testController.navigateTo(url(string));
});

When('ich mit dem Mauszeiger auf {string} klicke', async function (string) {
    await testController.click(select(string));
});

Then('wird {string} angezeigt', async function (string) {
    const selection = select(string).with({boundTestRun: testController});
    await testController.expect(selection.visible).ok();
});