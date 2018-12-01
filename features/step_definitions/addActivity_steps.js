const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

When('I insert valid data for the activity', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Visit Karlsruhe Castle");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe-schloss.de");
    await testController.typeText(select('date').with({boundTestRun: testController}), "2020-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "Karlsruhe Schloss");
});

When('I insert invalid data for the activity', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Visit Karlsruhe Castle");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe-schloss.de");
    // await testController.typeText(select('date').with({boundTestRun: testController}), "2020-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "Karlsruhe Schloss");
});

Then('The activity view is shown with the inserted data', async function () {
    activityTitle = select("").with({boundTestRun: testController});
    await testController.expect(activityTitle === "Visit Karlsruhe Castle");
});

