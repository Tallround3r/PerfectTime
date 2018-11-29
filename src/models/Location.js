import {ObjectModel} from 'objectmodel';

export default Location = ObjectModel({
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
