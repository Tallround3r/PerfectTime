import {ObjectModel} from 'objectmodel';

const Location = ObjectModel({
	title: String,
	description: String,
	date: Date,
	address: String,
}).defaults({
	title: '',
	description: '',
	date: new Date(),
	address: '',
});

export default Location;