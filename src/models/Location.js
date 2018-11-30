import {ObjectModel} from 'objectmodel';
import Address from './Address';

const Location = ObjectModel({
	title: String,
	description: String,
	startDate: Date,
	endDate: Date,
	address: Address,
}).defaults({
	title: '',
	description: '',
	startDate: new Date(),
	endDate: new Date(),
	address: new Address(),
});

export default Location;