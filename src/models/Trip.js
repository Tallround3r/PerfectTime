import {ArrayModel, ObjectModel} from 'objectmodel';
import User from './User';

const Trip = ObjectModel({
	title: String,
	description: String,
	startdate: Date,
	enddate: Date,
	owner: User,
	members: [ArrayModel(User)],
}).defaults({
	title: '',
	description: '',
	startDate: new Date(),
	endDate: new Date(),
});

export default Trip;