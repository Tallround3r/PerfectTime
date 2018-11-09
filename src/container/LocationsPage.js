import React from 'react';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';

class LocationsPage extends React.Component {

	render() {
		return (
			<div>
				<h1>Locations</h1>
				<NavLink exact to={routes.LOCATIONS_ADD}>Add Location</NavLink>
				<br/>
				<NavLink exact to={routes.LOCATIONS_EDIT}>Edit Location</NavLink>
			</div>
		);
	}
}

export default LocationsPage;