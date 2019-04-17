import {Button, createStyles, Paper, TextField, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import classNames from 'classnames';
import DatePicker from 'material-ui-pickers/DatePicker';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {isEqual} from 'underscore';
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
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	trip: Trip;
}

interface State {
	trip: Trip;
}

class TripEditPage extends React.Component<Props, State> {

	state = {
		trip: this.props.trip,
	};

	componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
		const {trip} = this.props;
		if (!isEqual(trip, prevProps.trip)) {
			this.setState({
				trip,
			});
		}
	}

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const {firestore, match, history} = this.props;
		const {trip} = this.state;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: match.params[routes.URL_PARAM_TRIP],
		};

		firestore.set(firestoreRef, trip);

		history.push(routes.TRIPS());

		e.preventDefault();
	};

	handleCancel = (e: MouseEvent) => {
		const {trip, history} = this.props;

		this.setState({
			trip,
		});

		history.push(routes.TRIPS());

		e.preventDefault();
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
		}];
	}),
	connect(
		({firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				trip: data.TRIPS
					&& data.TRIPS[tripId],
			};
		},
	),
	withStyles(styles),
)(TripEditPage);
