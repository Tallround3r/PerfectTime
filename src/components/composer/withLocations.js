import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../../constants/routes';
import {URL_PARAM_TRIP} from '../../constants/routes';


const withLocations = (Component) => {

	class WithLocations extends React.Component {
		componentDidMount() {
			const {match, firestore} = this.props;

			const tripId = match.params[routes.URL_PARAM_TRIP];
			firestore.setListener(`TRIPS/${tripId}/locations`);
		}

		componentWillUnmount() {
			const {match, firestore} = this.props;

			const tripId = match.params[routes.URL_PARAM_TRIP];
			firestore.unsetListener(`TRIPS/${tripId}/locations`);
		}

		render() {
			const {locations} = this.props;

			return !isLoaded(locations)
				? 'Loading Locations...'
				: isEmpty(locations)
					? 'No Locations created yet.'
					: <Component/>;
		}
	}

	return compose(
		withRouter,
		firestoreConnect(),
		connect(
			({firestore: {data}}, props) => {
				const tripId = props.match.params[URL_PARAM_TRIP];
				return {
					locations: data.TRIPS
						&& data.TRIPS[tripId]
						&& data.TRIPS[tripId].locations,
				};
			},
		),
	)(WithLocations);
};

export default withLocations;