const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

When('I insert valid data for the location', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Leipzig");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.leipzig.de");
    await testController.typeText(select('date').with({boundTestRun: testController}), "2019-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "04103 Leipzig");
});

When('I insert invalid data for the location', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Leipzig");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.leipzig.de");
    // await testController.typeText(select('date').with({boundTestRun: testController}), "2019-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "04103 Leipzig");
});

Then('The locations view is shown with the inserted data', async function () {
    locationTitle = select("...").with({boundTestRun: testController});
    await testController.expect(activityTitle === "Leipzig");
});

