import React from 'react';
import {Route, Switch} from 'react-router-dom';
import * as routes from '../../constants/routes';
import ActivityAddPage from '../ActivityAddPage';
import ActivityEditPage from '../ActivityEditPage';
import ActivityViewPage from '../ActivityViewPage';


function ActivityNavigation() {
	return (
		<Switch>
			<Route exact path={routes.ACTIVITY_ADD()} component={ActivityAddPage}/>
			<Route exact path={routes.ACTIVITY_EDIT()} component={ActivityEditPage}/>
			<Route exact path={routes.ACTIVITY_VIEW()} component={ActivityViewPage}/>
		</Switch>
	);
}

export default ActivityNavigation;
