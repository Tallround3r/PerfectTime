import validateSignIn from '../utils/validation/validateSignIn';

describe('email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid Email', () => {
        expect(validateSignIn('Tim.Kertzscher@web.de', 'password')).toBe(true);
    });
    it('knows that mail with missing @ is incorrect Email', () => {
        expect(validateSignIn('Tom.Tailor.web.de', 'password')).toBe(false);
    });
    it('knows that mail with missing . is incorrect Email', () => {
        expect(validateSignIn('Drachenlord@mailcom', 'password')).toBe(false);
    });
    it('knows that empty String is incorrect Email', () => {
        expect(validateSignIn('', 'password')).toBe(false);
    });
});

describe('password check', () => {
    it('knows that password is valid Email', () => {
        expect(validateSignIn('Tim.Test@web.de', 'password')).toBe(true);
    });
    it('knows that empty string is invalid Email', () => {
        expect(validateSignIn('Tim.Test@web.de', '')).toBe(false);
    });
});
