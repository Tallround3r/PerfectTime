import {Button, Paper, TextField, Typography, WithStyles, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker/DatePickerModal';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import Address from '../models/Address';
import styles from '../styles/ActivityEditStyles';
import {Activity} from '../types/activity';
import {parseDateIfValid} from '../utils/parser';


const INITIAL_ACTIVITY: Activity = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: new Address(),
};

interface ActivityAddPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any,
	activity: Activity
}

interface State {
	activity: Activity
}

class ActivityAddPage extends React.Component<ActivityAddPageProps, State> {

	state = {
		activity: INITIAL_ACTIVITY,
	};

	navigateBack = () => {
		const {history, match} = this.props;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		history.push(routes.LOCATIONS_EDIT(tripId, locationId));
	};

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const {firestore, match} = this.props;
		const {activity} = this.state;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		const firestoreRef = {
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
				subcollections: [{
					collection: 'activities',
				}],
			}],
		};
		firestore.add(firestoreRef, activity);

		this.navigateBack();

		e.preventDefault();
	};

	handleCancel = (e: MouseEvent) => {
		const {activity} = this.props;

		this.setState({
			activity,
		});

		this.navigateBack();

		e.preventDefault();
	};

	handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		this.setState((prevState) => {
			return {
				activity: {
					...prevState.activity,
					[name]: value,
				},
			};
		});
	};

	handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;

		this.setState((prevState) => ({
			activity: {
				...prevState.activity,
				address: {
					...prevState.activity.address,
					[name]: value,
				},
			},
		}));
	};

	handleChangeDate = (name: string) => (date: Date | null) => {
		this.setState((prevState) => {
			return {
				activity: {
					...prevState.activity,
					[name]: date,
				},
			};
		});
	};

	datePickerMask = (value: string) => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []);

	render() {
		const {classes} = this.props;
		const {activity} = this.state;
		const {title, description, startdate, enddate, address} = activity;

		return (
			<div className={classes.activityEditPage}>
				<Typography
					variant='h4'
					gutterBottom={true}
				>
					Add Activity
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
							label='Title'
							name='title'
							value={title}
							onChange={this.handleChangeInput}
							required={true}
						/>
						<TextField
							className={classes.inputField}
							label='Description'
							name='description'
							value={description}
							onChange={this.handleChangeInput}
							multiline={true}
							required={true}
						/>
						<div className={classes.inputHorizontalContainer}>
							<DatePicker
								className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
								keyboard={true}
								required={true}
								value={parseDateIfValid(startdate)}
								onChange={this.handleChangeDate('startdate')}
								label='Start Date'
								format='MM/dd/yyyy'
								placeholder='MM/DD/YYYY'
								mask={this.datePickerMask}
								disableOpenOnEnter={true}
								animateYearScrolling={false}
								fullWidth={true}
							/>
							<DatePicker
								className={classes.inputField}
								keyboard={true}
								required={true}
								value={parseDateIfValid(enddate)}
								onChange={this.handleChangeDate('enddate')}
								label='End Date'
								format='MM/dd/yyyy'
								placeholder='MM/DD/YYYY'
								mask={this.datePickerMask}
								disableOpenOnEnter={true}
								animateYearScrolling={false}
								fullWidth={true}
							/>
						</div>

						<Typography
							className={classes.addressLabel}
							variant='subtitle2'
						>
							Address
						</Typography>
						<div className={classes.inputHorizontalContainer}>
							<TextField
								className={classNames(classes.inputField, classes.inputHorizontalSpacing)}
								label='City'
								name='city'
								value={address.city || ''}
								onChange={this.handleChangeAddress}
								required={true}
								fullWidth={true}
							/>
							<TextField
								className={classes.inputField}
								label='ZIP-Code'
								name='zipCode'
								value={address.zipCode || ''}
								onChange={this.handleChangeAddress}
								fullWidth={true}
							/>
						</div>
						<TextField
							className={classes.inputField}
							label='Country'
							name='country'
							value={address.country || ''}
							onChange={this.handleChangeAddress}
							required={true}
						/>

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								type='submit'
								variant='contained'
								color='primary'
								fullWidth={true}
							>
								Add Activity
							</Button>
							<Button
								className={classes.actionButton}
								onClick={this.handleCancel}
								variant='contained'
								color='secondary'
								fullWidth={true}
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

export default compose(
	withRouter,
	firestoreConnect(),
	withStyles(styles),
)(ActivityAddPage);
