import {ObjectModel} from 'objectmodel';
import Address from './Address';


const Location = ObjectModel({
	title: String,
	description: String,
	startdate: [Object, null],
	enddate: [Object, null],
	address: Address,
}).defaults({
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: new Address(),
});

export default Location;