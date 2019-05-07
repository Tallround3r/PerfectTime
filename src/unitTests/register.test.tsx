let faker = require('faker');
import validateSignUp from '../utils/validation/validateSignUp';

let randomValidUsername = faker.internet.userName();
let randomValidEmail = faker.internet.email();
let randomValidPassword = faker.internet.password();
let randomValidFirstname = faker.name.firstName();
let randomValidLastname = faker.name.lastName();

describe('username check', () => {
	it('knows that Tallround3r is valid username', () => {
		expect(validateSignUp('Tallround3r', randomValidEmail, randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(true);
	});
	it('knows that empty string is incorrect username', () => {
		expect(validateSignUp('', randomValidEmail, randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
});

describe('email check', () => {
	it('knows that Tim.Kertzscher@web.de is valid Email', () => {
		expect(validateSignUp(randomValidUsername, 'Tim.Kertzscher@web.de', randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(true);
	});
	it('knows that mail with missing @ is incorrect Email', () => {
		expect(validateSignUp(randomValidUsername, 'Tim.Kertzscher.web.de', randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
	it('knows that mail with missing . is incorrect Email', () => {
		expect(validateSignUp(randomValidUsername, 'Drachenlord@webde', randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
	it('knows that empty String is incorrect Email', () => {
		expect(validateSignUp(randomValidUsername, '', randomValidPassword, randomValidPassword, randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
});

describe('password check', () => {
	it('knows when passes are matching', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, 'katze123', 'katze123', randomValidFirstname,
			randomValidLastname)).toBe(true);
	});
	it('knows when passes dont match', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, 'hund1', 'schildkröte2', randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
	it('knows that empty string is not a pass', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, '', '', randomValidFirstname,
			randomValidLastname)).toBe(false);
	});
});

describe('name check', () => {
	it('knows that Tim is valid firstname', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, randomValidPassword, randomValidPassword, 'Tim',
			randomValidLastname)).toBe(true);
	});
	it('knows that Kertzscher is valid lastname', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, randomValidPassword, randomValidPassword, randomValidFirstname,
			'Kertzscher')).toBe(true);
	});
	it('knows that empty string is invalid firstname', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, randomValidPassword, randomValidPassword, '',
			randomValidLastname)).toBe(false);
	});
	it('knows that empty string is invalid lastname', () => {
		expect(validateSignUp(randomValidUsername, randomValidEmail, randomValidPassword, randomValidPassword, randomValidFirstname,
			'')).toBe(false);
	});
});
