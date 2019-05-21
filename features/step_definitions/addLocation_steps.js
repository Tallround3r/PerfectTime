const {When, Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

When('I insert valid data for the locationT', async function () {
	/* eslint-disable */
	await testController.typeText(select('locationTitle').with({boundTestRun: testController}), 'Leipzig');
	await testController.typeText(select('locationDescription').with({boundTestRun: testController}), 'www.leipzig.de');
	await testController.typeText(select('locationDate').with({boundTestRun: testController}), '2019-12-23');
	await testController.typeText(select('locationAddress').with({boundTestRun: testController}), '04103 Leipzig');
	/* eslint-enable */
});

When('I insert invalid data for the locationT', async function () {
	/* eslint-disable */
	await testController.typeText(select('locationTitle').with({boundTestRun: testController}), 'Leipzig');
	await testController.typeText(select('locationDescription').with({boundTestRun: testController}), 'www.leipzig.de');
	// await testController.typeText(select('locationDate').with({boundTestRun: testController}), "2019-12-23");
	await testController.typeText(select('locationAddress').with({boundTestRun: testController}), '04103 Leipzig');
	/* eslint-enable */
});

Then('The locations view is shown with the inserted data', async function () {
	locationTitle = select('...').with({boundTestRun: testController});
	/* eslint-disable */
	await testController.expect(locationTitle === 'Leipzig');
	/* eslint-enable */
});
