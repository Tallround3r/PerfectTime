import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import connect from 'react-redux/es/connect/connect';
import {compose} from 'redux';

const styles = themes => {

};

class ActivitiesList extends React.Component {

	render() {
		const {activities} = this.props;

		return (
			<ul>
				{!isLoaded(activities)
					? 'Loading activities...'
					: isEmpty(activities)
						? 'No Activities created yet.'
						: Object.keys(activities).map(key =>
							<li key={key}>{activities[key].title}</li>,
						)
				}
			</ul>
		);
	}

}

ActivitiesList.propTypes = {
	classes: PropTypes.object.isRequired,
	tripId: PropTypes.string.isRequired,
	locationId: PropTypes.string.isRequired,
	activities: PropTypes.object,
};

export default compose(
	firestoreConnect((props) => [
		`TRIPS/${props.tripId}/locations/${props.locationId}/activities`,
	]),
	connect(
		({firestore: {data}}, props) => ({
			activities: data.TRIPS && data.TRIPS[props.tripId] && data.TRIPS[props.tripId].locations
				&& data.TRIPS[props.tripId].locations[props.locationId]
				&& data.TRIPS[props.tripId].locations[props.locationId].activities,
		}),
	),
	withStyles(styles),
)(ActivitiesList);