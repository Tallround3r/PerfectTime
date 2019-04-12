import {Button, createStyles, Paper, TextField, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker/DatePickerModal';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {Trip} from '../types/trip';
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

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	auth: any;
}

interface State {
	trip: Trip;
}

const INITIAL_TRIP: Trip = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
};

class TripAddPage extends React.Component<Props, State> {

	state = {
		trip: INITIAL_TRIP,
	};

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const {firestore, history, auth} = this.props;
		const {trip} = this.state;

		trip.owner = auth.uid;

		const firestoreRef = {
			collection: 'TRIPS',
		};

		firestore.add(firestoreRef, trip)
			.then(() => {
				history.push(routes.TRIPS());
			});
	};

	handleCancel = (e: MouseEvent) => {
		e.preventDefault();

		const {history} = this.props;

		this.setState({
			trip: INITIAL_TRIP,
		});

		history.push(routes.TRIPS());
	};

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

	render() {
		const {classes} = this.props;
		const {trip} = this.state;
		const {title, description, startdate, enddate} = trip;

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant='h4'
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

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								type='submit'
								variant='contained'
								color='primary'
								fullWidth={true}
							>
								Add Trip
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
	connect(
		({firebase: {auth}}: any) => ({
			auth,
		}),
	),
	withStyles(styles),
)(TripAddPage);
