import {ArrayModel, ObjectModel} from 'objectmodel';
import User from './User';

const Trip = ObjectModel({
	title: String,
	description: String,
	startdate: [Object, null],
	enddate: [Object, null],
	owner: [User, String, undefined],
	members: [ArrayModel(User), ArrayModel(String), undefined],
}).defaults({
	title: '',
	description: '',
	startdate: null,
	enddate: null,
});

export default Trip;