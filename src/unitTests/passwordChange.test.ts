let faker = require('faker');
import validateUpdatePW from '../utils/validation/validateUpdatePW';

const randomValidEmail = faker.internet.email();
const randomValidPassword = faker.internet.password();
const randomValidNewPassword = faker.internet.password();

describe('email check', () => {
	it('knows that Tim.Kertzscher@web.de is valid Email', () => {
		expect(validateUpdatePW('Tim.Kertzscher@web.de', randomValidPassword, randomValidNewPassword, randomValidNewPassword))
			.toBe(true);
	});
	it('knows that mail with missing @ is incorrect Email', () => {
		expect(validateUpdatePW('Tom.Tailor.web.de', randomValidPassword, randomValidNewPassword, randomValidNewPassword))
			.toBe(false);
	});
	it('knows that mail with missing . is incorrect Email', () => {
		expect(validateUpdatePW('Drachenlord@mailcom', randomValidPassword, randomValidNewPassword, randomValidNewPassword))
			.toBe(false);
	});
	it('knows that empty String is incorrect Email', () => {
		expect(validateUpdatePW('', randomValidPassword, randomValidNewPassword, randomValidNewPassword))
			.toBe(false);
	});
});

describe('password check', () => {
	it('knows that password is valid password', () => {
		expect(validateUpdatePW(randomValidEmail, 'password', randomValidNewPassword, randomValidNewPassword))
			.toBe(true);
	});
	it('knows that empty string is invalid password', () => {
		expect(validateUpdatePW(randomValidEmail, '', randomValidNewPassword, randomValidNewPassword))
			.toBe(false);
	});
});

describe('new password check', () => {
	it('knows when passes are matching', () => {
		expect(validateUpdatePW(randomValidEmail, randomValidPassword, 'blume123', 'blume123'))
			.toBe(true);
	});
	it('knows when passes dont match', () => {
		expect(validateUpdatePW(randomValidEmail, randomValidPassword, 'igel485697', 'blume123'))
			.toBe(false);
	});
	it('knows that empty string is not a pass', () => {
		expect(validateUpdatePW(randomValidEmail, randomValidPassword, '', ''))
			.toBe(false);
	});
});
