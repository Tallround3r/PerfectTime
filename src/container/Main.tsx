import React from 'react';
import {Route, Switch} from 'react-router-dom';
import * as routes from '../constants/routes';
import DemoPage from './DemoPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TripRoute from './TripRoute';
import UserRoute from './UserRoute';


function Main() {
	return (
		<main>
			<Switch>
				<Route path={routes.TRIPS()} component={TripRoute}/>
				<Route path={routes.USER()} component={UserRoute}/>
				<Route exact={true} path={routes.SIGN_IN} component={SignIn}/>
				<Route exact={true} path={routes.SIGN_UP} component={SignUp}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
