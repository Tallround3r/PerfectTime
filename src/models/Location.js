import {ObjectModel} from 'objectmodel';
import Address from './Address';


const Location = ObjectModel({
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

export default Location;