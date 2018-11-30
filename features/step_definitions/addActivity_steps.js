const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

Then('I have opened a location', async function (element) {
    await testController.navigateTo(url("perfectTimeTestLocation"));
    await testController.click(select("addActivityButton").with({boundTestRun: testController}));
});