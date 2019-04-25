import React from 'react';
import {Route, Switch} from 'react-router-dom';
import withDrawer from '../components/withDrawer';
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
import TripsPage from './TripsPage';
import UserViewPage from "./UserViewPage";
import UserEditPage from "./UserEditPage";
import UserDeletePage from "./UserDeletePage";
import UserUpdateMailPage from "./UserUpdateMailPage";
import UserUpdatePasswordPage from "./UserUpdatePasswordPage";


function Main() {
	return (
		<main>
			<Switch>
				<Route exact={true} path={routes.TRIPS()} component={withDrawer(TripsPage)}/>
				<Route exact={true} path={routes.TRIPS_ADD()} component={withDrawer(TripAddPage)}/>
				<Route exact={true} path={routes.TRIPS_EDIT()} component={withDrawer(TripEditPage)}/>
				<Route exact={true} path={routes.LOCATIONS()} component={withDrawer(LocationsPage)}/>
				<Route exact={true} path={routes.LOCATIONS_ADD()} component={withDrawer(LocationAddPage)}/>
				<Route exact={true} path={routes.LOCATIONS_EDIT()} component={withDrawer(LocationEditPage)}/>
				<Route exact={true} path={routes.LOCATIONS_VIEW()} component={withDrawer(LocationViewPage)}/>
				<Route exact={true} path={routes.ACTIVITY_ADD()} component={withDrawer(ActivityAddPage)}/>
				<Route exact={true} path={routes.ACTIVITY_EDIT()} component={withDrawer(ActivityEditPage)}/>
				<Route exact={true} path={routes.ACTIVITY_VIEW()} component={withDrawer(ActivityViewPage)}/>
				<Route exact={true} path={routes.USER_VIEW()} component={withDrawer(UserViewPage)}/>
				<Route exact={true} path={routes.USER_EDIT()} component={withDrawer(UserEditPage)}/>
				<Route exact={true} path={routes.USER_DELETE_ACCOUNT()} component={withDrawer(UserDeletePage)}/>
				<Route exact={true} path={routes.USER_CHANGE_PASSWORD()} component={withDrawer(UserUpdatePasswordPage)}/>
				<Route exact={true} path={routes.USER_CHANGE_EMAIL()} component={withDrawer(UserUpdateMailPage)}/>
				<Route exact={true} path={routes.MEMBERS()} component={withDrawer(MembersPage)}/>
				<Route exact={true} path={routes.SIGN_IN} component={SignIn}/>
				<Route exact={true} path={routes.SIGN_UP} component={SignUp}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
