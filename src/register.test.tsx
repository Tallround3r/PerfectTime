import validateSignUp from './utils/validation/validateSignUp';

describe('username check', () => {
    it('knows that Tallround3r is valid username', () => {
        expect(validateSignUp("Tallround3r", "Tim.Kertzscher@web.de", "password", "password", "name", "lastname")).toBe(true);
    });
    it('knows that empty string is incorrect username', () => {
        expect(validateSignUp("", "Tim.Kertzscher@web.de", "password", "password", "name", "lastname")).toBe(false);
    });
});
 
describe('email check', () => {
    it('knows that Tim.Kertzscher@web.de is valid Email', () => {
        expect(validateSignUp("username", "Tim.Kertzscher@web.de", "password", "password", "name", "lastname")).toBe(true);
    });
    it('knows that mail with missing @ is incorrect Email', () => {
        expect(validateSignUp("username", "Tim.Kertzscher.web.de", "password", "password", "name", "lastname")).toBe(false);
    });
    it('knows that mail with missing . is incorrect Email', () => {
        expect(validateSignUp("username", "Drachenlord@webde", "password", "password", "name", "lastname")).toBe(false);
    });
    it('knows that empty String is incorrect Email', () => {
        expect(validateSignUp("", "Tim.Kertzscher@web.de", "password", "password", "name", "lastname")).toBe(false);
    });
});

describe('password check', () => {
    it('knows when passes are matching', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "katze123", "katze123", "name", "lastname")).toBe(true);
    });
    it('knows when passes dont match', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "hund1", "schildkröte2", "name", "lastname")).toBe(false);
    });
    it('knows that empty string is not a pass', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "", "", "name", "lastname")).toBe(false);
    });
});

describe('name check', () => {
    it('knows that Tallround3r is valid username', () => {
        expect(validateSignUp("Tallround3r", "Max.Musterman@outlook.de", "katze123", "katze123", "name", "lastname")).toBe(true);
    });
    it('knows that Tim is valid firstname', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "katze123", "katze123", "Tim", "lastname")).toBe(true);
    });
    it('knows that Kertzscher is valid lastname', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "katze123", "katze123", "name", "Kertzscher")).toBe(true);
    });
    it('knows that empty string is valid username', () => {
        expect(validateSignUp("", "Max.Musterman@outlook.de", "katze123", "katze123", "name", "lastname")).toBe(false);
    });
    it('knows that empty string is valid firstname', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "katze123", "katze123", "", "lastname")).toBe(false);
    });
    it('knows that empty string is valid lastname', () => {
        expect(validateSignUp("username", "Max.Musterman@outlook.de", "katze123", "katze123", "name", "")).toBe(false);
    });
});