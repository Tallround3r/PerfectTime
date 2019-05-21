const testcafe = require('testcafe');
// const hooks = require('../support/hooks');

exports.addErrorToController = function () {
	// @ts-ignore
	testController.executionChain
		.catch(function (result) {
			const errAdapter = new testcafe.embeddingUtils.TestRunErrorFormattableAdapter(result, {
				// @ts-ignore
				testRunPhase: testController.testRun.phase,
				// @ts-ignore
				userAgent: testController.testRun.browserConnection.browserInfo.userAgent,
			});
			// @ts-ignore
			return testController.testRun.errs.push(errAdapter);
		});
};
//
// exports.ifErrorTakeScreenshot = function(resolvedTestController) {
//
//     if (hooks.getIsTestCafeError() === true && testController.testRun.opts.takeScreenshotsOnFails === true) {
//         if (process.argv.includes('--format') || process.argv.includes('-f') || process.argv.includes('--format-options')) {
//             return resolvedTestController.takeScreenshot().then(function(path) {
//
//                 return hooks.getAttachScreenshotToReport();
//             });
//         } else {
//             return resolvedTestController.takeScreenshot();
//         }
//     }
// };
