import React from 'react';
import LocationAddPage from './LocationAddPage';
import LocationEditPage from './LocationEditPage';
import {NavLink} from 'react-router-dom';
import * as routes from '../constants/routes';

class ActivitiesPage extends React.Component {

	render() {
		return (
			<div>
				<h1>Activities</h1>
				<NavLink exact to={routes.ACTIVITY_ADD}>Add Activity</NavLink>
				<br/>
				<NavLink exact to={routes.ACTIVITY_EDIT}>Edit Activity</NavLink>
			</div>
		);
	}
}

export default ActivitiesPage;