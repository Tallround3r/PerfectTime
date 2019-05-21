const {When, Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

When('I insert valid activity data', async function () {
	/* eslint-disable */
	await testController.typeText(select('activityTitle').with({boundTestRun: testController}), 'Visit Karlsruhe Schlosslichtspiele');
	await testController.typeText(select('activityDescription').with({boundTestRun: testController}), 'www.karlsruhe-events.de');
	await testController.typeText(select('activityDate').with({boundTestRun: testController}), '2020-12-23');
	await testController.typeText(select('activityAddress').with({boundTestRun: testController}), 'Karlsruhe Schloss');
	/* eslint-enable */
});

When('I insert invalid activity data', async function () {
	/* eslint-disable */
	await testController.click(select('activityTitle').with({boundTestRun: testController})).pressKey('ctrl+a delete');
	await testController.typeText(select('activityTitle').with({boundTestRun: testController}), '');
	// await testController.typeText(select('description').with({boundTestRun: testController}), "www.karlsruhe.de");
	// await testController.typeText(select('date').with({boundTestRun: testController}), "2012-12-23");
	// await testController.typeText(select('address').with({boundTestRun: testController}), "76131 Karlsruhe");
	/* eslint-enable */
});

Then('The activity view is shown with the updated data', async function () {
	activityTitle = select('').with({boundTestRun: testController});
	/* eslint-disable */
	await testController.expect(activityTitle === 'Visit Karlsruhe Schlosslichtspiele');
	/* eslint-enable */
});
