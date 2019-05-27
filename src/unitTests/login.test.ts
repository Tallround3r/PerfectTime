const faker = require('faker');
import validateSignIn from '../utils/validation/validateSignIn';

const randomValidPassword = faker.internet.password();
const randomValidEmail = faker.internet.email();

describe('email check', () => {
	it('knows that Tim.Kertzscher@web.de is valid Email', () => {
		expect(validateSignIn('Tim.Kertzscher@web.de', randomValidPassword))
			.toBe(true);
	});
	it('knows that mail with missing @ is incorrect Email', () => {
		expect(validateSignIn('Tom.Tailor.web.de', randomValidPassword))
			.toBe(false);
	});
	it('knows that mail with missing . is incorrect Email', () => {
		expect(validateSignIn('Drachenlord@mailcom', randomValidPassword))
			.toBe(false);
	});
	it('knows that empty String is incorrect Email', () => {
		expect(validateSignIn('', randomValidPassword))
			.toBe(false);
	});
});

describe('password check', () => {
	it('knows that password is valid password', () => {
		expect(validateSignIn(randomValidEmail, 'password'))
			.toBe(true);
	});
	it('knows that empty string is invalid password', () => {
		expect(validateSignIn(randomValidEmail, ''))
			.toBe(false);
	});
});
