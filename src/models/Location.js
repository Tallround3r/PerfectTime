import {ObjectModel} from 'objectmodel';
import PropTypes from 'prop-types';
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

// class Location {
// 	title = '';
// 	description = '';
// 	startdate = null;
// 	enddate = null;
// 	address = new Address();
// }
//
// Location.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	description: PropTypes.string.isRequired,
// 	startdate: PropTypes.objectOf(Date).isRequired,
// 	enddate: PropTypes.objectOf(Date).isRequired,
// 	address: PropTypes.objectOf(Address).isRequired,
// };

export default Location;