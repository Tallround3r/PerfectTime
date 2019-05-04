import React from 'react';
import {Route, Switch} from 'react-router-dom';
import * as routes from '../../constants/routes';
import ActivityAddPage from '../ActivityAddPage';
import ActivityEditPage from '../ActivityEditPage';
import ActivityViewPage from '../ActivityViewPage';
import LocationAddPage from '../LocationAddPage';
import LocationEditPage from '../LocationEditPage';
import LocationsPage from '../LocationsPage';
import LocationViewPage from '../LocationViewPage';
import MembersPage from '../MembersPage';
import TripEditPage from '../TripEditPage';

function TripRoute() {
	return <Switch>
		<Route exact={true} path={routes.TRIPS_EDIT()} component={TripEditPage}/>
		<Route exact={true} path={routes.TRIP_MEMBERS()} component={MembersPage}/>
		<Route exact={true} path={routes.LOCATIONS()} component={LocationsPage}/>
		<Route exact={true} path={routes.LOCATIONS_ADD()} component={LocationAddPage}/>
		<Route exact={true} path={routes.LOCATIONS_EDIT()} component={LocationEditPage}/>
		<Route exact={true} path={routes.LOCATIONS_VIEW()} component={LocationViewPage}/>
		<Route exact={true} path={routes.ACTIVITY_ADD()} component={ActivityAddPage}/>
		<Route exact={true} path={routes.ACTIVITY_EDIT()} component={ActivityEditPage}/>
		<Route exact={true} path={routes.ACTIVITY_VIEW()} component={ActivityViewPage}/>
	</Switch>;
}

export default TripRoute;