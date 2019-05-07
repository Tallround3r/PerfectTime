import validateUpdateMail from '../utils/validation/validateUpdateMail';

describe('email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid new Email', () => {
        expect(validateUpdateMail('Tom.Tailor@ich.de','Tim.Kertzscher@web.de', 'password')).toBe(true);
    });
    it('knows that mail with missing @ is incorrect new Email', () => {
        expect(validateUpdateMail('Tom.Tailor@ich.de', 'Tom.Tailor.web.de', 'password')).toBe(false);
    });
    it('knows that mail with missing . is incorrect new Email', () => {
        expect(validateUpdateMail('Tom.Tailor@ich.de','Tim@mailcom', 'password')).toBe(false);
    });
    it('knows that empty String is incorrect new Email', () => {
        expect(validateUpdateMail('Tom.Tailor@ich.de', '', 'password')).toBe(false);
    });
    it('knows that empty String is incorrect Email', () => {
        expect(validateUpdateMail('', 'Tim.Kertzscher@web.de', 'password')).toBe(false);
    });
    it('knows that mail with missing . is incorrect new Email', () => {
        expect(validateUpdateMail('Jan@mailcom', 'Tim.Kertzscher@web.de', 'password')).toBe(false);
    });
    it('knows that mail with missing @ is incorrect new Email', () => {
        expect(validateUpdateMail('Test.mail.com', 'Tim.Kertzscher@web.de', 'password')).toBe(false);
    });
});
