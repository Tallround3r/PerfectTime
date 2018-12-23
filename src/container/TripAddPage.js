import {Button, Paper, TextField, Typography, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker/DatePickerModal';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {URL_PARAM_TRIP} from '../constants/routes';
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
});

const INITIAL_LOCATION = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
};

class TripAddPage extends React.Component {

	state = {
		location: INITIAL_LOCATION,
	};

	handleSubmit = (e) => {
		const {firestore, history, auth} = this.props;
		const {location} = this.state;

		location.owner = auth.uid;

		const firestoreRef = {
			collection: 'TRIPS',
		};

		firestore.add(firestoreRef, location)
			.then((docRef) => {
				history.push(routes.TRIPS());
			});

		e.preventDefault();
	};

	handleCancel = (e) => {
		const {history, match} = this.props;

		this.setState({
			location: INITIAL_LOCATION,
		});

		const tripId = match.params[URL_PARAM_TRIP];
		history.push(routes.TRIPS(tripId));

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
		const {classes} = this.props;
		const {location} = this.state;
		const {title, description, startdate, enddate} = location;

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant="h4"
					gutterBottom={true}
				>
					Add new Trip
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
								Add Trip
							</Button>
							<Button
								className={classes.actionButton}
								onClick={this.handleCancel}
								variant="contained"
								color="secondary"
								fullWidth
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

TripAddPage.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	auth: PropTypes.object,
};

export default compose(
	withRouter,
	firestoreConnect(),
	connect(
		({firebase: {auth}}) => ({
			auth,
		}),
	),
	withStyles(styles),
)(TripAddPage);