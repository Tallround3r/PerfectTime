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
import TripsPage from './TripsPage';
import TripAddPage from './TripAddPage';
//import TripViewPage from './TripViewPage';


function Main() {
	return (
		<main>
			<Switch>
				<Route exact path={routes.TRIPS()} component={withDrawer(TripsPage)}/>
				<Route exact path={routes.TRIPS_ADD()} component={withDrawer(TripAddPage)}/>
				{/*<Route exact path={routes.TRIPS_VIEW()} component={withDrawer(TripViewPage)}/>*/}
				<Route exact path={routes.LOCATIONS()} component={withDrawer(LocationsPage)}/>
				<Route exact path={routes.LOCATIONS_ADD()} component={withDrawer(LocationAddPage)}/>
				<Route exact path={routes.LOCATIONS_EDIT()} component={withDrawer(LocationEditPage)}/>
				<Route exact path={routes.LOCATIONS_VIEW()} component={withDrawer(LocationViewPage)}/>
				<Route exact path={routes.ACTIVITY_ADD()} component={withDrawer(ActivityAddPage)}/>
				<Route exact path={routes.ACTIVITY_EDIT()} component={withDrawer(ActivityEditPage)}/>
                <Route exact path={routes.ACTIVITY_VIEW()} component={withDrawer(ActivityViewPage)}/>
				<Route exact path={routes.MEMBERS} component={withDrawer(MembersPage)}/>
				<Route exact path={routes.SIGN_IN} component={SignIn}/>
				<Route exact path={routes.SIGN_UP} component={SignUp}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
