const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;

When('I insert valid location data', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "Karlsruhe");
    await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe.de");
    await testController.typeText(select('date').with({boundTestRun: testController}), "2019-12-23");
    await testController.typeText(select('address').with({boundTestRun: testController}), "76131 Karlsruhe");
});

When('I insert invalid location data', async function () {
    await testController.typeText(select('title').with({boundTestRun: testController}), "");
    await testController.typeText(select('description').with({boundTestRun: testController}), 'www.karlsruhe.de');
    await testController.typeText(select('date').with({boundTestRun: testController}), '2019-12-23');
    await testController.typeText(select('address').with({boundTestRun: testController}), '76131 Karlsruhe');
});

Then('The location view is shown with the updated data', async function () {
    locationTitle = select('').with({boundTestRun: testController});
    await testController.expect(locationTitle === 'Karlsruhe');
});

