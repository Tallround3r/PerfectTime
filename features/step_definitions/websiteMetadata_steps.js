const {Then} = require('cucumber');
const select = require('../support/pages/const-selection').select;

Then('the {string} should be {string}', async function (element, expected) {
	/* eslint-disable */
	const title = select(element).with({boundTestRun: testController});
	await testController.expect(title === expected);
	/* eslint-enable */
});
