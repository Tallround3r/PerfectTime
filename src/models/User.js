import {ObjectModel} from 'objectmodel';

const User = ObjectModel({
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	memberSince: Date,
	country: [String],
	language: [String],
}).defaults({
	firstName: '',
	lastName: '',
	memberSince: new Date(),
});

export default User;