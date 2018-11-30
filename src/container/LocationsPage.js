import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {URL_PARAM_TRIP} from '../constants/routes';


const styles = theme => ({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
	},
	bigColumn: {
		flexBasis: '50%',
		textAlign: 'center',
	},
	smallColumn: {
		flexBasis: '1%',
		textAlign: 'right',
	},
	borderLeft: {
		borderLeft: 'thin solid #000000',
		height: '100px',
	},
	hrLine: {
		width: '1px',
		height: '67px',
	},
	activitiesContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		width: '100%',
	},
});

class LocationsPage extends React.Component {

	showAllLocations() {
	}

	searchLocations() {

	}

	render() {
		const {classes, locations, match} = this.props;
		const tripId = match.params[URL_PARAM_TRIP];

		return (
			<div>
				<h1>Locations</h1>
				<p><b>Overview with unordered list of activities</b></p>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key, index) => {
								let location = locations[key];
								let startdate = new Date(locations[key].startDate.seconds * 1000);
								let enddate = new Date(locations[key].endDate.seconds * 1000);
								return (
									<div key={key}>
										<ExpansionPanel className={classes.locationPanel}>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar><StarIcon/></Avatar>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{location.title}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Start Date: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>End Date: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].description}</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact
															 to={routes.LOCATIONS_EDIT(tripId, key)}><Avatar><ArrowRightIcon/></Avatar></NavLink>
												</div>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails>
												<div className={classes.activitiesContainer}>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>
			</div>
		);
	}
}

LocationsPage.propTypes = {
	match: PropTypes.object.isRequired,
};

export default compose(
	withRouter,
	firestoreConnect((props) => [
		`TRIPS/${props.match.params[URL_PARAM_TRIP]}/locations`,
	]),
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
	withStyles(styles),
)(LocationsPage);
