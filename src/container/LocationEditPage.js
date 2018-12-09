import {Button, Paper, TextField, Typography, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {omit} from 'underscore';
import ActivitiesSlider from '../components/ActivitiesSlider';
import * as routes from '../constants/routes';
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import {Location} from '../models';


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
        width: '18em',
        height: '18em',
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
		const {firestore, match, history} = this.props;
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

		const tripId = match.params[URL_PARAM_TRIP];
		const locationId = match.params[URL_PARAM_LOCATION];
		history.push(routes.LOCATIONS_VIEW(tripId, locationId));

		e.preventDefault();
	};

	handleCancel = (e) => {
		const {location, history, match} = this.props;

		this.setState({
			location: {
				...location,
				startdate: location.startdate.toDate(),
				enddate: location.enddate.toDate(),
			},
		});

		const tripId = match.params[URL_PARAM_TRIP];
		const locationId = match.params[URL_PARAM_LOCATION];
		history.push(routes.LOCATIONS_VIEW(tripId, locationId));

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
					Edit Location
				</Typography>

				<div>
					<Paper
						className={classes.imagePaper}
					>
						<AddPhotoAlternateOutlined
							className={classes.imageIcon}
						/>
					</Paper>

					<form className={classes.inputContainer} onSubmit={this.handleSubmit}>
						<TextField
							className={classes.inputField}
							label="Title"
							name="title"
							value={title}
							onChange={this.handleChangeInput}
							required
						/>
						<TextField
							className={classes.inputField}
							label="Description"
							name="description"
							value={description}
							onChange={this.handleChangeInput}
							multiline
							required
						/>
						<div className={classes.inputHorizontalContainer}>
							<DatePicker
								className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
								keyboard
								required
								value={startdate}
								onChange={this.handleChangeDate('startdate')}
								label="Start Date"
								format="MM/dd/yyyy"
								placeholder="MM/DD/YYYY"
								mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
								disableOpenOnEnter
								animateYearScrolling={false}
								fullWidth
							/>
							<DatePicker
								className={classes.inputField}
								keyboard
								required
								value={enddate}
								onChange={this.handleChangeDate('enddate')}
								label="End Date"
								format="MM/dd/yyyy"
								placeholder="MM/DD/YYYY"
								mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
								disableOpenOnEnter
								animateYearScrolling={false}
								fullWidth
							/>
						</div>

						<Typography
							className={classes.addressLabel}
							variant="subtitle2"
						>
							Address
						</Typography>
						<div className={classes.inputHorizontalContainer}>
							<TextField
								className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
								label="City"
								name="city"
								value={address.city || ''}
								onChange={this.handleChangeAddress}
								required
								fullWidth
							/>
							<TextField
								className={classes.inputField}
								label="ZIP-Code"
								name="zipCode"
								value={address.zipCode || ''}
								onChange={this.handleChangeAddress}
								fullWidth
							/>
						</div>
						<TextField
							className={classes.inputField}
							label="Country"
							name="country"
							value={address.country || ''}
							onChange={this.handleChangeAddress}
							required
						/>

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
							>
								Save Location
							</Button>
							<Button
								className={classes.actionButton}
								variant="contained"
								color="secondary"
								fullWidth
								onClick={this.handleCancel}
							>
								Cancel
							</Button>
						</div>
					</form>
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
                    <div className={classes.actionButtonsContainer}>
                        <NavLink exact to={routes.ACTIVITY_ADD(tripId, locationId)}>
                            <Button
                                className={classes.actionButton}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Add Activity
                            </Button>
                        </NavLink>
                    </div>
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
	history: PropTypes.object.isRequired,
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