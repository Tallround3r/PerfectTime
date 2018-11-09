import React from 'react';
import {Route, Switch} from 'react-router-dom';
import * as routes from '../constants/routes';
import DemoPage from './DemoPage';
import LocationsPage from './LocationsPage';
import ActivitiesPage from './ActivitiesPage';
import withWrapper from '../components/withWrapper';
import LocationAddPage from './LocationAddPage';
import LocationEditPage from './LocationEditPage';
import MembersPage from './MembersPage';
import ActivityAddPage from './ActivityAddPage';
import ActivityEditPage from './ActivityEditPage';


function Main() {
	return (
		<main>
			<Switch>
				<Route exact path={routes.LOCATIONS} component={withWrapper(LocationsPage)}/>
				<Route exact path={routes.LOCATIONS_ADD} component={withWrapper(LocationAddPage)}/>
				<Route exact path={routes.LOCATIONS_EDIT} component={withWrapper(LocationEditPage)}/>
				<Route exact path={routes.ACTIVITIES} component={withWrapper(ActivitiesPage)}/>
				<Route exact path={routes.ACTIVITY_ADD} component={withWrapper(ActivityAddPage)}/>
				<Route exact path={routes.ACTIVITY_EDIT} component={withWrapper(ActivityEditPage)}/>
				<Route exact path={routes.MEMBERS} component={withWrapper(MembersPage)}/>
				<Route path={routes.LANDING} component={DemoPage}/>
			</Switch>
		</main>
	);
}

export default Main;
