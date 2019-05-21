const {When, Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

When('I insert valid data for the activity', async function () {
	// @ts-ignore
	await testController.typeText(select('activityTitle').with({boundTestRun: testController}), 'Visit Karlsruhe Castle');
	// @ts-ignore
	await testController.typeText(select('activityDescription').with({boundTestRun: testController}), 'www.karlsruhe-schloss.de');
	// @ts-ignore
	await testController.typeText(select('activityDate').with({boundTestRun: testController}), '2020-12-23');
	// @ts-ignore
	await testController.typeText(select('activityAddress').with({boundTestRun: testController}), 'Karlsruhe Schloss');
});

When('I insert invalid data for the activity', async function () {
	// @ts-ignore
	await testController.typeText(select('activityTitle').with({boundTestRun: testController}), 'Visit Karlsruhe Castle');
	// @ts-ignore
	await testController.typeText(select('activityDescription').with({boundTestRun: testController}), 'www.karlsruhe-schloss.de');
	// await testController.typeText(select('activityDate').with({boundTestRun: testController}), "2020-12-23");
	// @ts-ignore
	await testController.typeText(select('activityAddress').with({boundTestRun: testController}), 'Karlsruhe Schloss');
});

Then('The activity view is shown with the inserted data', async function () {
	activityTitle = select('').with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(activityTitle === 'Visit Karlsruhe Castle');
});
