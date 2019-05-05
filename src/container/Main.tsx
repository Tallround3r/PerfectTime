import React from 'react';
import {Route, Switch} from 'react-router-dom';
import withAppWrapper from '../components/withAppWrapper';
import * as routes from '../constants/routes';
import DemoPage from './DemoPage';
import TripRoute from './routes/TripRoute';
import UserRoute from './routes/UserRoute';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TripAddPage from './TripAddPage';
import TripsPage from './TripsPage';


function Main() {
	return (
		<main>
			<Switch>
				<Route exact={true} path={routes.SIGN_IN} component={SignIn}/>
				<Route exact={true} path={routes.SIGN_UP} component={SignUp}/>
				<Route exact={true} path={routes.TRIPS_ADD()} component={withAppWrapper(TripAddPage)}/>
				<Route path={routes.TRIP_VIEW()} component={withAppWrapper(TripRoute)}/>
				<Route path={routes.TRIPS()} component={withAppWrapper(TripsPage)}/>
				<Route path={routes.USER()} component={UserRoute}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
