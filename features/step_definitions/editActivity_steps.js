const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

When('I insert valid activity data', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Visit Karlsruhe Schlosslichtspiele");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe-events.de");
    await testController.typeText(select('date').with({boundTestRun: testController}), "2020-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "Karlsruhe Schloss");
});

When('I insert invalid activity data', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "");
    // await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe.de");
    // await testController.typeText(select('date').with({boundTestRun: testController}), "2012-12-23");
    // await testController.typeText(select('address').with({boundTestRun: testController}), "76131 Karlsruhe");
});

Then('The activity view is shown with the updated data', async function () {
    activityTitle = select("").with({boundTestRun: testController});
    await testController.expect(activityTitle === "Visit Karlsruhe Schlosslichtspiele");
});

