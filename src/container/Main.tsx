import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppWrapper from '../components/AppWrapper';
import * as routes from '../constants/routes';
import ActivityAddPage from './ActivityAddPage';
import ActivityEditPage from './ActivityEditPage';
import ActivityViewPage from './ActivityViewPage';
import DemoPage from './DemoPage';
import LocationAddPage from './LocationAddPage';
import LocationEditPage from './LocationEditPage';
import LocationsPage from './LocationsPage';
import LocationViewPage from './LocationViewPage';
import MembersPage from './MembersPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TripAddPage from './TripAddPage';
import TripEditPage from './TripEditPage';
import TripRoute from './TripRoute';
import TripsPage from './TripsPage';
import UserDeletePage from './UserDeletePage';
import UserEditPage from './UserEditPage';
import UserUpdateMailPage from './UserUpdateMailPage';
import UserUpdatePasswordPage from './UserUpdatePasswordPage';
import UserViewPage from './UserViewPage';


function Main() {
	// @ts-ignore
	return (
		<main>
			<Switch>
				<Route exact={true} path={routes.TRIPS()} component={TripRoute}/>
				<Route exact={true} path={routes.TRIPS_ADD()} component={TripAddPage}/>
				<Route exact={true} path={routes.TRIPS_EDIT()} component={TripEditPage}/>
				<Route exact={true} path={routes.LOCATIONS()} component={LocationsPage}/>
				<Route exact={true} path={routes.LOCATIONS_ADD()} component={LocationAddPage}/>
				<Route exact={true} path={routes.LOCATIONS_EDIT()} component={LocationEditPage}/>
				<Route exact={true} path={routes.LOCATIONS_VIEW()} component={LocationViewPage}/>
				<Route exact={true} path={routes.ACTIVITY_ADD()} component={ActivityAddPage}/>
				<Route exact={true} path={routes.ACTIVITY_EDIT()} component={ActivityEditPage}/>
				<Route exact={true} path={routes.ACTIVITY_VIEW()} component={ActivityViewPage}/>
				<Route exact={true} path={routes.USER_VIEW()} component={UserViewPage}/>
				<Route exact={true} path={routes.USER_EDIT()} component={UserEditPage}/>
				<Route exact={true} path={routes.USER_DELETE_ACCOUNT()} component={UserDeletePage}/>
				<Route exact={true} path={routes.USER_CHANGE_PASSWORD()} component={UserUpdatePasswordPage}/>
				<Route exact={true} path={routes.USER_CHANGE_EMAIL()} component={UserUpdateMailPage}/>
				<Route exact={true} path={routes.MEMBERS()} component={MembersPage}/>
				<Route exact={true} path={routes.SIGN_IN} component={SignIn}/>
				<Route exact={true} path={routes.SIGN_UP} component={SignUp}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
