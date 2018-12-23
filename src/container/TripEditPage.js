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
import {isEqual, omit} from 'underscore';
import ActivitiesSlider from '../components/ActivitiesSlider';
import * as routes from '../constants/routes';
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import {Location, Trip} from '../models';
import {parseDateIfValid} from '../utils/parser';


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

class TripEditPage extends React.Component {

	state = {
		trip: this.props.trip,
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {trip} = this.props;
		if (!isEqual(trip, prevProps.trip)) {
			this.setState({
				trip,
			});
		}
	}

	handleSubmit = (e) => {
		const {firestore, match, history} = this.props;
		const {trip} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[URL_PARAM_TRIP],
		};

		firestore.set(firestoreRef, trip);

		history.push(routes.TRIPS());

		e.preventDefault();
	};

	handleCancel = (e) => {
		const {trip, history} = this.props;

		this.setState({
			trip,
		});

		history.push(routes.TRIPS());

		e.preventDefault();
	};

	handleChangeInput = (e) => {
		const {name, value} = e.target;

		this.setState((prevState) => {
			return {
				trip: {
					...prevState.trip,
					[name]: value,
				},
			};
		});
	};

	handleChangeDate = (name) => (date) => {
		this.setState((prevState) => {
			return {
				trip: {
					...prevState.trip,
					[name]: date,
				},
			};
		});
	};

	render() {
		const {classes} = this.props;
		const {trip} = this.state;
		const {title, description, startdate, enddate} = trip;

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant="h4"
					gutterBottom={true}
				>
					Edit Trip
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
								value={parseDateIfValid(startdate)}
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
								value={parseDateIfValid(enddate)}
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

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
							>
								Save Trip
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
			</div>
		);
	}

}

TripEditPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			[URL_PARAM_TRIP]: PropTypes.string.isRequired,
		}),
	}).isRequired,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	trip: PropTypes.objectOf(Location),
};

TripEditPage.defaultProps = {
	trip: new Trip(),
};

export default compose(
	withRouter,
	firestoreConnect((props) => {
		const tripId = props.match.params[URL_PARAM_TRIP];
		return [{
			collection: 'TRIPS',
			doc: tripId,
		}];
	}),
	connect(
		({firestore: {data}}, props) => {
			const tripId = props.match.params[URL_PARAM_TRIP];
			return {
				trip: data.TRIPS
					&& data.TRIPS[tripId],
			};
		},
	),
	withStyles(styles),
)(TripEditPage);