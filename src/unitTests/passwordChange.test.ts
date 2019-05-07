let faker = require('faker');
import validateUpdatePW from '../utils/validation/validateUpdatePW';

let randomValidPAssword = faker.internet.password();

describe('email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid Email', () => {
        console.log(randomValidPAssword);
        expect(validateUpdatePW('Tim.Kertzscher@web.de', 'password', randomValidPAssword, randomValidPAssword)).toBe(true);
    });
    it('knows that mail with missing @ is incorrect Email', () => {
        expect(validateUpdatePW('Tom.Tailor.web.de', 'password', 'blume123', 'blume123')).toBe(false);
    });
    it('knows that mail with missing . is incorrect Email', () => {
        expect(validateUpdatePW('Drachenlord@mailcom', 'password', 'blume123', 'blume123')).toBe(false);
    });
    it('knows that empty String is incorrect Email', () => {
        expect(validateUpdatePW('', 'password', 'blume123', 'blume123')).toBe(false);
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