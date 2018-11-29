import {ObjectModel} from 'objectmodel';

const Activity = ObjectModel({
	title: String,
	description: String,
	startDate: Date,
	endDate: Date,
	address: String,
}).defaults({
	title: '',
	description: '',
	startDate: new Date(),
	endDate: new Date(),
	address: '',
});

export default Activity;