import {Button, createStyles, Paper, TextField, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ActionMeta, ValueType} from 'react-select/lib/types';
import {compose} from 'redux';
import {isEqual, omit} from 'underscore';
import ConfirmDialog from '../components/ConfirmDialog';
import MultiSelect, {OptionType} from '../components/MultiSelect';
import * as routes from '../constants/routes';
import {db} from '../firebase/firebase';
import {Trip, User} from '../types';
import {datePickerMask} from '../utils/datePickerUtils';
import {parseDateIfValid} from '../utils/parser';

const styles = (theme: Theme) => createStyles({
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
		marginBottom: theme.spacing.unit * 3,
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
	divider: {
		height: theme.spacing.unit * 3,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	auth: any;
	trip: Trip;
	users: User[];
}

interface State {
	trip: Trip;
	selectedMembers: ValueType<OptionType>, // Array<{ label: string; value: string }>
	openPublishDialog: boolean,
}

const INITIAL_TRIP: Trip = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
};


class TripEditPage extends React.Component<Props, State> {

	state = {
		trip: this.props.trip || INITIAL_TRIP,
		selectedMembers: [],
		openPublishDialog: false,
	};

	componentDidMount(): void {
		this.setState({
			selectedMembers: this.getSelectOptionsFromTripMembers(this.props.trip),
		});
	}

	componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
		const {trip, users} = this.props;
		if (!isEqual(trip, prevProps.trip) || !isEqual(users, prevProps.users)) {
			this.setState({
				trip,
				selectedMembers: this.getSelectOptionsFromTripMembers(trip),
			});
		}
	}

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const {firestore, match, history} = this.props;
		const {trip, selectedMembers} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[routes.URL_PARAM_TRIP],
		};

		const members = !!selectedMembers
			// @ts-ignore
			? selectedMembers.map((memberOption) => memberOption.value)
			: [];

		const tripN = {
			...omit(trip, 'locations'),
			members,
		};

		firestore.set(firestoreRef, tripN);

		history.push(routes.TRIPS());
	};

	handleCancel = (e: MouseEvent) => {
		e.preventDefault();
		const {trip, history} = this.props;

		this.setState({
			trip,
		});
		history.push(routes.TRIPS());
	};

	handlePublishBtnClicked = () => (e: MouseEvent) => {
		e.preventDefault();
		this.setState({
			openPublishDialog: true,
		});
	};

	// set trip public, cannot be undone, allows any user to view a trip
	handlePublishTrip = () => (e: MouseEvent) => {
		e.preventDefault();
		const {firestore, match, history} = this.props;
		const {trip} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[routes.URL_PARAM_TRIP],
		};

		const tripN = trip;
		tripN.public = true;

		firestore.set(firestoreRef, tripN).then(() => {
			this.setState({
				openPublishDialog: false,
			});
		}).catch(() => {
			this.setState({
				openPublishDialog: false,
			});
			alert('ERROR\nMissing permission to publish this Trip!\nMaybe you are not owner of the Trip.');
		});

		history.push(routes.TRIPS());
	}
	handleCancelPublishTrip = () => (e: MouseEvent) => {
		this.setState({
			openPublishDialog: false,
		});
	}

	handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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

	handleChangeDate = (name: string) => (date: Date | null) => {
		this.setState((prevState) => {
			return {
				trip: {
					...prevState.trip,
					[name]: date,
				},
			};
		});
	};

	handleChangeMembers = (value: ValueType<OptionType>, {action}: ActionMeta) => {
		this.setState({
			selectedMembers: value,
		});
	};

	getSelectOptionsFromTripMembers = (trip: Trip): ValueType<OptionType> => {
		const {users} = this.props;
		if (trip && trip.members && users) {
			return trip.members.map((memberId) => {
				// @ts-ignore
				const username = users[memberId] ? users[memberId].username || '' : '';
				return {label: username, value: memberId};
			});
		}
	};

	getTripAndExport = async (e: MouseEvent) => {
		const tripToExport = {
			...this.state.trip,
			locations: {},
		};

		await db.collection('TRIPS').doc(this.props.match.params[routes.URL_PARAM_TRIP])
			.collection('locations').get().then((locations: any) => {
				locations.forEach(async (location: any) => {
					// @ts-ignore
					tripToExport.locations[location.id] = await location.data();
					// @ts-ignore
					tripToExport.locations[location.id].activities = {};
					await db.collection('TRIPS').doc(this.props.match.params[routes.URL_PARAM_TRIP])
						.collection('locations').doc(location.id)
						.collection('activities').get().then((activities: any) => {
							activities.forEach(async (activity: any) => {
								// @ts-ignore
								tripToExport.locations[location.id].activities[activity.id] = await activity.data();
							});
						});
				});
			});
		this.exportToJson(tripToExport, tripToExport.title);
		e.preventDefault();
	};

	exportToJson = (object: any, fileName: string) => {
		const filename = `${fileName}.json`;
		const contentType = 'application/json;charset=utf-8;';
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(object)))], {type: contentType});
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			const a = document.createElement('a');
			a.download = filename;
			a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(object));
			a.target = '_blank';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	render() {
		const {classes, users} = this.props;
		const {trip, selectedMembers} = this.state;
		const {title, description, startdate, enddate} = trip || INITIAL_TRIP;

		const selectableUsers = isLoaded(users) && !isEmpty(users) && !!trip
			? Object.keys(users)
				.filter((id) => id !== trip.owner)
				// @ts-ignore
				.map((id) => ({label: users[id].username, value: id}))
			: [];

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant='h4'
				>
					Edit Trip
				</Typography>
				<Typography
					variant={'subtitle1'}
					gutterBottom={true}
				>
					{
						// @ts-ignore
						!!trip && !!trip.owner && !!users && !!users[trip.owner] && `create by ${users[trip.owner].username}`
					}
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
						<MultiSelect
							options={selectableUsers}
							label={'Members'}
							placeholder={'Select Members...'}
							value={selectedMembers}
							onChange={this.handleChangeMembers}
						/>

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								onClick={this.getTripAndExport}
								variant='contained'
								color='primary'
								fullWidth={true}
							>
								Export to JSON
							</Button>
							<Button
								className={classes.actionButton}
								type='submit'
								variant='contained'
								color='primary'
								fullWidth={true}
							>
								Save Trip
							</Button>

							<Button
								className={classes.actionButton}
								variant='contained'
								color='secondary'
								fullWidth={true}
								onClick={this.handleCancel}
							>
								Cancel
							</Button>
						</div>
						<br/>
						<span hidden={trip.public || trip.owner !== this.props.auth.uid}>
							<Button
								className={classes.actionButton}
								variant='contained'
								color='secondary'
								fullWidth={true}
								onClick={this.handlePublishBtnClicked()}
							>
								Publish Trip
							</Button>
								<ConfirmDialog
									content={'Are you sure you want to publish this trip ?\n' +
									'This action can not be undone.'}
									open={this.state.openPublishDialog}
									onConfirm={this.handlePublishTrip()}
									onCancel={this.handleCancelPublishTrip()}
								/>
							</span>
					</form>
				</div>
			</div>
		);
	}

}


export default compose(
	withRouter,
	firestoreConnect((props: Props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		return [{
			collection: 'TRIPS',
			doc: tripId,
		}, {
			collection: 'users',
		}];
	}),

	connect(
		({firebase, firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				auth: firebase.auth,
				trip: data.TRIPS
					&& data.TRIPS[tripId],
				users: data.users,
			};
		},
	),
	withStyles(styles),
)(TripEditPage);
