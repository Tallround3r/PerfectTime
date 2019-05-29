import {Button, TextField, Typography, WithStyles, withStyles} from '@material-ui/core';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker/DatePickerModal';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {isEqual} from 'underscore';
import ImageComponent from '../components/ImageComponent';
import * as routes from '../constants/routes';
import styles from '../styles/ActivityEditStyles';
import {Activity} from '../types';
import {datePickerMask} from '../utils/datePickerUtils';
import {parseDateIfValid} from '../utils/parser';


interface ActivityEditPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
	activity: Activity;
	firestore: any;
}

interface State {
	activity: Activity;
	file: File | null;
}

const INITIAL_ACTIVITY: Activity = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: {
		city: '',
		country: '',
	},
};

class ActivityEditPage extends React.Component<ActivityEditPageProps, State> {
	inputRef: React.RefObject<any>;

	state = {
		activity: this.props.activity || INITIAL_ACTIVITY,
		file: null,
	};

	constructor(props: ActivityEditPageProps) {
		super(props);
		this.inputRef = React.createRef();
	}

	openFileDialog = () => {
		this.inputRef.current.click();
	};

	handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		const file = e.target.files[0];
		this.setState({file});
	};

	navigateBack = () => {
		const {history, match} = this.props;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];
		const activityId = match.params[routes.URL_PARAM_ACTIVITY];

		history.push(routes.ACTIVITY_VIEW(tripId, locationId, activityId));
	};

	componentDidUpdate(prevProps: ActivityEditPageProps, prevState: State, snapshot: any) {
		const {activity} = this.props;
		if (!isEqual(activity, prevProps.activity)) {
			this.setState({
				activity,
			});
		}
	}

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const {firestore, match} = this.props;
		const {activity} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[routes.URL_PARAM_TRIP],
			subcollections: [{
				collection: 'locations',
				doc: match.params[routes.URL_PARAM_LOCATION],
				subcollections: [{
					collection: 'activities',
					doc: match.params[routes.URL_PARAM_ACTIVITY],
				}],
			}],
		};
		firestore.set(firestoreRef, activity);

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

	handleChangeDate = (name: string) => (date: Date) => {
		this.setState((prevState) => {
			return {
				activity: {
					...prevState.activity,
					[name]: date,
				},
			};
		});
	};

	render() {
		const {classes, match} = this.props;
		const {activity} = this.state;
		const {title, description, startdate, enddate, address} = activity;
		const activityId = match.params[routes.URL_PARAM_ACTIVITY];

		return (
			<div className={classes.activityEditPage}>
				<Typography
					variant='h4'
					gutterBottom={true}
				>
					Edit Activity
				</Typography>
				<div>
					<Button
						onClick={this.openFileDialog}
						className={classes.imageButton}
					>
						<ImageComponent
							path={`images/activities/${activityId}`}
						/>
					</Button>

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
								mask={datePickerMask}
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
								mask={datePickerMask}
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
								Save Activity
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

export default compose(withRouter,
	firestoreConnect((props: ActivityEditPageProps) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		const locationId = props.match.params[routes.URL_PARAM_LOCATION];
		const activityId = props.match.params[routes.URL_PARAM_ACTIVITY];
		return [{
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
				subcollections: [{
					collection: 'activities',
					doc: activityId,
				}],
			}],
		}];
	}),
	connect(
		({firestore: {data}}: any, props: ActivityEditPageProps) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			const locationId = props.match.params[routes.URL_PARAM_LOCATION];
			const activityId = props.match.params[routes.URL_PARAM_ACTIVITY];
			return {
				activity: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId]
					&& data.TRIPS[tripId].locations[locationId].activities
					&& data.TRIPS[tripId].locations[locationId].activities[activityId],
			};
		},
	),
	withStyles(styles),
)(ActivityEditPage);
