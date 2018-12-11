import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../../constants/routes';
import {URL_PARAM_TRIP} from '../../constants/routes';


const withActivities = (Component) => {

	class WithActivities extends React.Component {
		componentDidMount() {
			const {match, firestore} = this.props;

			const tripId = match.params[routes.URL_PARAM_TRIP];
			firestore.setListener(`TRIPS/${tripId}/locations/*/activities/`);
		}

		componentWillUnmount() {
			const {match, firestore} = this.props;

			const tripId = match.params[routes.URL_PARAM_TRIP];
			firestore.unsetListener(`TRIPS/${tripId}/locations/*/activities/`);
		}

		render() {
			const {activities} = this.props;

			return !isLoaded(activities)
				? 'Loading Activities...'
				: <Component/>;
		}
	}

	return compose(
		withRouter,
		firestoreConnect(),
		connect(
			({firestore: {data}}, props) => {
				const tripId = props.match.params[URL_PARAM_TRIP];
				const locationId = '*';
				return {
					activities: data.TRIPS
						&& data.TRIPS[tripId]
						&& data.TRIPS[tripId].locations
						&& data.TRIPS[tripId].locations[locationId]
						&& data.TRIPS[tripId].locations[locationId].activities,
				};
			},
		),
	)(WithActivities);
};

export default withActivities;