import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {withStyles} from '@material-ui/core';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import common from '@material-ui/core/es/colors/common';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
	locationPanel: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	avatar: {
		marginRight: theme.spacing.unit * 2,
		color: '#fff',
		backgroundColor: common[500],
	},
});

class LocationsPage extends React.Component {

	showAllLocations() {
	}

	searchLocations() {

	}

	render() {
		const {classes, locations} = this.props;

		return (
			<div>
				<h1>Locations</h1>

				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key, index) => {
								return (
									<ExpansionPanel key={key}>
										<ExpansionPanelSummary className={classes.locationPanel}>
											<Avatar className={classes.avatar}>{index + 1}</Avatar>
											<Typography variant='h6'>
												{locations[key].title}
											</Typography>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails>
											<Typography>
												{locations[key].description}
											</Typography>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								);
							})}
				</div>

				<br/>
				<NavLink exact to={routes.LOCATIONS_ADD}>Add Location</NavLink>
				<br/>
				<NavLink exact to={routes.LOCATIONS_EDIT}>Edit Location</NavLink>
			</div>
		);
	}
}

export default compose(
	firestoreConnect([
		'TRIPS/TXjQVQjjfXRfBnCJ1q0L/locations',
	]),
	connect(
		({firestore: {data}}, props) => ({
			locations: data.TRIPS && data.TRIPS['TXjQVQjjfXRfBnCJ1q0L'] && data.TRIPS['TXjQVQjjfXRfBnCJ1q0L'].locations,
		}),
	),
	withStyles(styles),
)(LocationsPage);