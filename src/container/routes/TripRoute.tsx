import {CircularProgress} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, withFirestore} from 'react-redux-firebase';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {isEqual} from 'underscore';
import {AUTH_CONDITION_TRIP} from '../../constants/auth-conditions';
import * as routes from '../../constants/routes';
import {firebase} from '../../firebase';
import {Trip} from '../../types';
import ActivityAddPage from '../ActivityAddPage';
import ActivityEditPage from '../ActivityEditPage';
import ActivityViewPage from '../ActivityViewPage';
import LocationAddPage from '../LocationAddPage';
import LocationEditPage from '../LocationEditPage';
import LocationsPage from '../LocationsPage';
import LocationViewPage from '../LocationViewPage';
import MembersPage from '../MembersPage';
import TripEditPage from '../TripEditPage';

interface TripRouteProps extends RouteComponentProps<any> {
}

interface TripRouteState {
	authorized: boolean;
}

class TripRoute extends React.Component<TripRouteProps, TripRouteState> {
	state = {
		authorized: false,
	};

	componentDidMount(): void {
		const {match} = this.props;
		const tripId = match.params[routes.URL_PARAM_TRIP];

		firebase.auth.onAuthStateChanged((authUser) => {
			firebase.db.collection('TRIPS').doc(tripId).get()
				.then((doc) => {
					if (AUTH_CONDITION_TRIP(authUser, doc.data())) {
						this.setState({authorized: true});
					} else {
						this.setState({authorized: false});
						this.props.history.push(routes.TRIPS());
					}
				});
		});
	}

	render() {
		const {authorized} = this.state;
		return authorized ?
			<Switch>
				<Route exact={true} path={routes.TRIPS_EDIT()} component={TripEditPage}/>
				<Route exact={true} path={routes.TRIP_MEMBERS()} component={MembersPage}/>
				<Route exact={true} path={routes.LOCATIONS()} component={LocationsPage}/>
				<Route exact={true} path={routes.LOCATIONS_ADD()} component={LocationAddPage}/>
				<Route exact={true} path={routes.LOCATIONS_EDIT()} component={LocationEditPage}/>
				<Route exact={true} path={routes.LOCATIONS_VIEW()} component={LocationViewPage}/>
				<Route exact={true} path={routes.ACTIVITY_ADD()} component={ActivityAddPage}/>
				<Route exact={true} path={routes.ACTIVITY_EDIT()} component={ActivityEditPage}/>
				<Route exact={true} path={routes.ACTIVITY_VIEW()} component={ActivityViewPage}/>
			</Switch> :
			<CircularProgress/>;
	}
}

export default withRouter(TripRoute);
