const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

Then('I have opened a location', async function () {
    await testController.navigateTo(url("PerfectTimeTestLocation"));
});

Then('There is no {string}', async function (element) {
    addActivityButton = select(element).with({boundTestRun: testController});
    await testController.expect(addActivityButton === null).ok();               //check if element is null not working
});