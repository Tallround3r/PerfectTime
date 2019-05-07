let faker = require('faker');
import validateUpdatePW from '../utils/validation/validateUpdatePW';

let randomValidPassword = faker.internet.password();
let randomValidNewPassword = faker.internet.password();

describe('email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid Email', () => {
        expect(validateUpdatePW('Tim.Kertzscher@web.de', randomValidPassword, randomValidNewPassword, randomValidNewPassword)).toBe(true);
    });
    it('knows that mail with missing @ is incorrect Email', () => {
        expect(validateUpdatePW('Tom.Tailor.web.de', randomValidPassword, randomValidNewPassword, randomValidNewPassword)).toBe(false);
    });
    it('knows that mail with missing . is incorrect Email', () => {
        expect(validateUpdatePW('Drachenlord@mailcom', randomValidPassword, randomValidNewPassword, randomValidNewPassword)).toBe(false);
    });
    it('knows that empty String is incorrect Email', () => {
        expect(validateUpdatePW('', randomValidPassword, randomValidNewPassword, randomValidNewPassword)).toBe(false);
    });
});

// describe('password check', () => {
//     // it('knows that Tim.Kertzscher@web.de is valid Email', () => {
//     //     expect(validateUpdatePW('Tim.Kertzscher@web.de', 'password', 'blume123', 'blume123')).toBe(true);
//     // });
//
// });
//
// describe('new password check', () => {
//     // it('knows that Tim.Kertzscher@web.de is valid Email', () => {
//     //     expect(validateUpdatePW('Tim.Kertzscher@web.de', 'password', 'blume123', 'blume123')).toBe(true);
//     // });
//
// });