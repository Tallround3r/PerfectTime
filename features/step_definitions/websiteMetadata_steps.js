const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

Then('the {string} should be {string}', async function (element, expected) {
	const title = select(element).with({boundTestRun: testController});
	// @ts-ignore
	await testController.expect(title === expected);
});
