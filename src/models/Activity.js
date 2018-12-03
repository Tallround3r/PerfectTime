import {ObjectModel} from 'objectmodel';
import Address from './Address';

const Activity = ObjectModel({
	title: String,
	description: String,
	startdate: Object,
	enddate: Object,
	address: Address,
}).defaults({
	title: '',
	description: '',
	startdate: new Date(),
	enddate: new Date(),
	address: new Address(),
});

export default Activity;