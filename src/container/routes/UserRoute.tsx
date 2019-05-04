import React from 'react';
import {Route, Switch} from 'react-router-dom';
import withAppWrapper from '../../components/withAppWrapper';
import * as routes from '../../constants/routes';
import UserDeletePage from '../UserDeletePage';
import UserEditPage from '../UserEditPage';
import UserUpdateMailPage from '../UserUpdateMailPage';
import UserUpdatePasswordPage from '../UserUpdatePasswordPage';
import UserViewPage from '../UserViewPage';

function UserRoute() {
	return <Switch>
		<Route exact={true} path={routes.USER_EDIT()} component={UserEditPage}/>
		<Route exact={true} path={routes.USER_DELETE_ACCOUNT()} component={UserDeletePage}/>
		<Route exact={true} path={routes.USER_CHANGE_PASSWORD()} component={UserUpdatePasswordPage}/>
		<Route exact={true} path={routes.USER_CHANGE_EMAIL()} component={UserUpdateMailPage}/>
		<Route path={routes.USER()} component={UserViewPage}/>
	</Switch>
}

export default withAppWrapper(UserRoute);
