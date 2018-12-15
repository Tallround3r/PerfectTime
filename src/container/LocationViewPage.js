import {Button, Paper, Typography, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import ActivitiesSlider from '../components/ActivitiesSlider';
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import * as routes from '../constants/routes';
import {Location} from '../models';
import {parseDateToString} from '../utils/parser';


const styles = theme => ({
	locationViewPage: {
		paddingTop: theme.spacing.unit * 3,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit,
		padding: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 10,
		minWidth: '25em',
	},
	inputHorizontalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	imagePaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing.unit,
		float: 'right',
		width: '30em',
		height: '20em',
	},
	imageIcon: {
		fontSize: '10em',
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
	},
	paperField: {
		width: '100%',
		height: 'auto',
	},
});


class LocationViewPage extends React.Component {

	render() {
		const {classes, match, location} = this.props;
		const {title, description, startdate, enddate, address} = location;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		return (
			<div className={classes.locationViewPage}>
				<Typography
					variant="h4"
					gutterBottom={true}
				>
					{title}
				</Typography>

				<div>
					<Paper
						className={classes.imagePaper}
					>
						<AddPhotoAlternateOutlined
							className={classes.imageIcon}
						/>
					</Paper>

					<div className={classes.inputContainer}>
						<Paper className={classes.paperField}>
							<Typography>Description:</Typography>
							<Typography variant="h6">{description}</Typography>
						</Paper>
						<div className={classes.inputHorizontalContainer}>
							<Paper className={classes.paperField}>
								<Typography>From:</Typography>
								<Typography variant="h6">{parseDateToString(startdate)}</Typography>
							</Paper>
							<Paper className={classes.paperField}>
								<Typography>To:</Typography>
								<Typography variant="h6">{parseDateToString(enddate)}</Typography>
							</Paper>
						</div>
						<hr/>
						<Typography
							className={classes.addressLabel}
							variant="subtitle2"
						>
							Address
						</Typography>
						<Paper className={classes.paperField}>
							<Typography>City:</Typography>
							<Typography variant="h6">{address.zipCode} {address.city}</Typography>
						</Paper>
						<Paper className={classes.paperField}>
							<Typography>Country:</Typography>
							<Typography variant="h6">{address.country}</Typography>
						</Paper>
						<hr/>
						<NavLink exact to={routes.LOCATIONS_EDIT(tripId, locationId)}>
							<Button
								color="primary"
								variant="contained"
								fullWidth
							>
								Edit Location
							</Button>
						</NavLink>
					</div>
				</div>

				<div className={classes.activitiesContainer}>
					<Typography
						variant="h5"
						gutterBottom={true}
					>
						Activities
					</Typography>

					<ActivitiesSlider
						tripId={tripId}
						locationId={locationId}
					/>
				</div>
			</div>
		);
	}

}

LocationViewPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			[URL_PARAM_TRIP]: PropTypes.string.isRequired,
			[URL_PARAM_LOCATION]: PropTypes.string.isRequired,
		}),
	}).isRequired,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	location: PropTypes.objectOf(Location).isRequired,
};
LocationViewPage.defaultProps = {
	location: new Location(),
};

export default compose(
	withRouter,
	firestoreConnect((props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		const locationId = props.match.params[routes.URL_PARAM_LOCATION];
		return [
			`TRIPS/${tripId}/locations/${locationId}`,
		];
	}),
	connect(
		({firestore: {data}}, props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			const locationId = props.match.params[routes.URL_PARAM_LOCATION];
			return {
				location: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId],
			};
		},
	),
	withStyles(styles),
)(LocationViewPage);