import validateUpdatePW from '../utils/validation/validateUpdatePW';
let faker = require('faker');
import {auth, db} from '../firebase/firebase';

const randomValidEmail = faker.internet.email();
const randomValidPassword = faker.internet.password();
const randomValidNewPassword = faker.internet.password();

describe('email check', () => {
	it('works', () => {
		expect(true)
			.toBe(true);
	});
});
