import React from 'react';
import {Route, Switch} from 'react-router-dom';
import * as routes from '../../constants/routes';
import LocationAddPage from '../LocationAddPage';
import LocationEditPage from '../LocationEditPage';
import LocationsPage from '../LocationsPage';
import LocationViewPage from '../LocationViewPage';
import ActivityNavigation from './ActivityNavigation';


function LocationNavigation() {
	return (
		<Switch>
			<Route exact path={routes.LOCATIONS_ADD()} component={LocationAddPage}/>
			<Route exact path={routes.LOCATIONS_EDIT()} component={LocationEditPage}/>
			<Route exact path={routes.LOCATIONS_VIEW()} component={LocationViewPage}/>
			<Route path={routes.ACTIVITIES()} component={ActivityNavigation}/>
			<Route path={routes.LOCATIONS()} component={LocationsPage}/>
		</Switch>
	);
}

export default LocationNavigation;
