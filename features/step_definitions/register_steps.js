const {Given, When, Then} = require('cucumber');
const url = require('../support/pages/const-url').url;
const select = require('../support/pages/const-selection').select;
const { ClientFunction } = require('testcafe');


Given('I am not logged in', function () {
    // Write code here that turns the phrase above into concrete actions
    //return 'pending';
});

Then('There is a {string} called {string}', async function (element, expected) {
    const button = select(element).with({boundTestRun: testController});
    await testController.expect(button === expected);
});

// normally And
Then('I insert invalid Data', async function () {
    await testController.typeText(select('first name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('last name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('username').with({boundTestRun: testController}), "testUser");
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.de");
    await testController.typeText(select('password').with({boundTestRun: testController}), "test");
    await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), "notest");
});

// normally And
Then('I insert valid Data', async function () {
    await testController.typeText(select('first name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('last name').with({boundTestRun: testController}), "test");
    await testController.typeText(select('username').with({boundTestRun: testController}), "testUser");
    await testController.typeText(select('email').with({boundTestRun: testController}), "test@user.com");
    await testController.typeText(select('password').with({boundTestRun: testController}), "test12");
    await testController.typeText(select('passwordConfirm').with({boundTestRun: testController}), "test12");
});

