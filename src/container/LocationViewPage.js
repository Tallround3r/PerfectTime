import {Button, Paper, TextField, Typography, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {omit} from 'underscore';
import ActivitiesSlider from '../components/ActivitiesSlider';
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import {Location} from '../models';
import * as routes from "../constants/routes";


const styles = theme => ({
	locationEditPage: {
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
	inputField: {
		marginTop: theme.spacing.unit,
		color: '#000000'
	},
	inputHorizontalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	inputHorizontalSpacing: {
		marginRight: theme.spacing.unit * 2,
	},
	addressLabel: {
		marginTop: theme.spacing.unit * 2,
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
	actionButtonsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit * 4,
	},
	actionButton: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
	},
	paperField: {
		width: '100%',
		height: 'auto'
	}
});


class LocationEditPage extends React.Component {

	state = {
		location: new Location(),
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {location} = this.props;
		if (location !== prevProps.location) {
			this.setState({
				location: {
					...location,
					startdate: location.startdate.toDate(),
					enddate: location.enddate.toDate(),
				},
			});
		}
	}

	handleSubmit = (e) => {
		const {firestore, match} = this.props;
		const {location} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[URL_PARAM_TRIP],
			subcollections: [{
				collection: 'locations',
				doc: match.params[URL_PARAM_LOCATION],
			}],
		};
		const locationWithoutActivities = omit(location, 'activities');

		firestore.set(firestoreRef, locationWithoutActivities);

		e.preventDefault();
	};

	handleCancel = (e) => {
		const {location} = this.props;

		this.setState({
			location: {
				...location,
				startdate: location.startdate.toDate(),
				enddate: location.enddate.toDate(),
			},
		});

		e.preventDefault();
	};

	handleChangeInput = (e) => {
		const {name, value} = e.target;

		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					[name]: value,
				},
			};
		});
	};

	handleChangeAddress = (e) => {
		const {name, value} = e.target;

		this.setState((prevState) => ({
			location: {
				...prevState.location,
				address: {
					...prevState.location.address,
					[name]: value,
				},
			},
		}));
	};

	handleChangeDate = (name) => (date) => {
		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					[name]: date,
				},
			};
		});
	};

	render() {
		const {classes, match} = this.props;
		const {location} = this.state;
		const {title, description, startdate, enddate, address} = location;
		const tripId = match.params[URL_PARAM_TRIP];
		const locationId = match.params[URL_PARAM_LOCATION];

		return (
			<div className={classes.locationEditPage}>
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
						{/*<Paper className={classes.paperField}>
							<Typography>Title:</Typography>
							<Typography variant="h6">{title}</Typography>
						</Paper>*/}
						<Paper className={classes.paperField}>
							<Typography>Description:</Typography>
							<Typography variant="h6">{description}</Typography>
						</Paper>
						<div className={classes.inputHorizontalContainer}>
							<Paper className={classes.paperField}>
								<Typography>From:</Typography>
								<Typography variant="h6">12/10/2018</Typography>
							</Paper>
							<Paper className={classes.paperField}>
								<Typography>To:</Typography>
								<Typography variant="h6">12/11/2018</Typography>
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
						<Button
							color="primary"
							href={routes.LOCATIONS_EDIT(tripId, locationId)}
							variant="contained"
							fullWidth
						>
							Edit Location
						</Button>
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

LocationEditPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			[URL_PARAM_TRIP]: PropTypes.string.isRequired,
			[URL_PARAM_LOCATION]: PropTypes.string.isRequired,
		}),
	}).isRequired,
	classes: PropTypes.object.isRequired,
	location: PropTypes.objectOf(Location),
};

export default compose(
	withRouter,
	firestoreConnect((props) => {
		const tripId = props.match.params[URL_PARAM_TRIP];
		const locationId = props.match.params[URL_PARAM_LOCATION];
		return [
			`TRIPS/${tripId}/locations/${locationId}`,
		];
	}),
	connect(
		({firestore: {data}}, props) => {
			const tripId = props.match.params[URL_PARAM_TRIP];
			const locationId = props.match.params[URL_PARAM_LOCATION];
			return {
				location: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId],
			};
		},
	),
	withStyles(styles),
)(LocationEditPage);