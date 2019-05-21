const {When, Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

When('I insert valid locationT data', async function () {
	/* eslint-disable */
	await testController.typeText(select('locationTitle').with({boundTestRun: testController}), 'Karlsruhe');
	await testController.typeText(select('locationDescription').with({boundTestRun: testController}), 'www.karlsruhe.de');
	await testController.typeText(select('locationDate').with({boundTestRun: testController}), '2019-12-23');
	await testController.typeText(select('locationAddress').with({boundTestRun: testController}), '76131 Karlsruhe');
	/* eslint-enable */
});

When('I insert invalid locationT data', async function () {
	/* eslint-disable */
	await testController.click(select('locationTitle').with({boundTestRun: testController})).pressKey('ctrl+a delete');
	await testController.typeText(select('locationTitle').with({boundTestRun: testController}), '');
//     await testController.typeText(select('description').with({boundTestRun: testController}), 'www.karlsruhe.de');
//     await testController.typeText(select('date').with({boundTestRun: testController}), '2019-12-23');
//     await testController.typeText(select('address').with({boundTestRun: testController}), '76131 Karlsruhe');
	/* eslint-enable */
});

Then('The locationT view is shown with the updated data', async function () {
	locationTitle = select('').with({boundTestRun: testController});
	/* eslint-disable */
	await testController.expect(locationTitle === 'Karlsruhe');
	/* eslint-enable */
});
