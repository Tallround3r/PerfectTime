import React from 'react';
import {compose} from 'redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {withStyles} from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
	gridList: {
		flexWrap: 'nowrap',
		textAlign: 'center',
		backgroundColor: theme.palette.background.paper,
	}
});

class ActivitiesList extends React.Component {

	render() {
		const {classes} = this.props;
		const {activities} = this.props;

		return (
			<GridList className={classes.gridList} cols={2.5}>
				{!isLoaded(activities)
					? <Typography>Loading activities...</Typography>
					: isEmpty(activities)
						? <Typography>No Activities created yet.</Typography>
						: Object.keys(activities).map(key =>
							<GridListTile key={key}>
								<Typography>{activities[key].title}</Typography>
							</GridListTile>
						)
				}
			</GridList>
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