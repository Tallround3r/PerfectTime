import React from 'react';
import {Route, Switch} from 'react-router-dom';
import withDrawer from '../components/composer/withDrawer';
import * as routes from '../constants/routes';
import DemoPage from './DemoPage';
import MembersPage from './MembersPage';
import LocationNavigation from './nav/LocationNavigation';
import SignIn from './SignIn';
import SignUp from './SignUp';


function Main() {
	return (
		<main>
			<Switch>
				<Route exact path={routes.MEMBERS} component={withDrawer(MembersPage)}/>
				<Route exact path={routes.SIGN_IN} component={SignIn}/>
				<Route exact path={routes.SIGN_UP} component={SignUp}/>
				<Route path={routes.LOCATIONS()} component={withDrawer(LocationNavigation)}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
