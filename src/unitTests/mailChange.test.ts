let faker = require('faker');
import validateUpdateMail from '../utils/validation/validateUpdateMail';

let randomValidPassword = faker.internet.password();
let randomValidNewEmail = faker.internet.email();
let randomValidEmail = faker.internet.email();

describe('new email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid new Email', () => {
        expect(validateUpdateMail(randomValidEmail,'Tim.Kertzscher@web.de', randomValidPassword)).toBe(true);
    });
    it('knows that mail with missing @ is incorrect new Email', () => {
        expect(validateUpdateMail(randomValidEmail, 'Tom.Tailor.web.de', randomValidPassword)).toBe(false);
    });
    it('knows that mail with missing . is incorrect new Email', () => {
        expect(validateUpdateMail(randomValidEmail,'Tim@mailcom', randomValidPassword)).toBe(false);
    });
    it('knows that empty String is incorrect new Email', () => {
        expect(validateUpdateMail(randomValidEmail, '', randomValidPassword)).toBe(false);
    });
});

    describe('email check', () => {
    it('knows that empty String is incorrect Email', () => {
        expect(validateUpdateMail('', randomValidNewEmail, randomValidPassword)).toBe(false);
    });
    it('knows that mail with missing . is incorrect new Email', () => {
        expect(validateUpdateMail('Jan@mailcom', randomValidNewEmail, randomValidPassword)).toBe(false);
    });
    it('knows that mail with missing @ is incorrect new Email', () => {
        expect(validateUpdateMail('Test.mail.com', randomValidNewEmail, randomValidPassword)).toBe(false);
    });
});
