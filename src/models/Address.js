import {ObjectModel} from 'objectmodel';
import GeoPoint from './GeoPoint';

const Address = ObjectModel({
	city: String,
	country: String,
	street: [String],
	streetNumber: [Number, String, undefined],
	zipCode: [String],
	geoPoint: [GeoPoint],
}).defaults({
	city: '',
	country: '',
});

export default Address;