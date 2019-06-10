import {Button, createStyles, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {isEqual, omit} from 'underscore';
import ActivitiesSlider from '../components/ActivitiesSlider';
import LocationMetadataInput from '../components/LocationMetadataInput';
import * as routes from '../constants/routes';
import {uploadFile} from '../firebase/storage';
import {Location} from '../types';


const styles = (theme: Theme) => createStyles({
	locationEditPage: {
		paddingTop: theme.spacing.unit * 3,
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
	locationT: Location;
	firestore: any;
}

interface State {
	location: Location;
	file: File | null;
}

const INITIAL_LOCATION: Location = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: {
		city: '',
		country: '',
	},
};

class LocationEditPage extends React.Component<Props, State> {
	fileInput: React.RefObject<any>;

	state = {
		location: this.props.locationT || INITIAL_LOCATION,
		file: null,
	};

	constructor(props: Props) {
		super(props);

		this.fileInput = React.createRef();
	}

	openFileDialog = () => {
		this.fileInput.current.click();
	};

	handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		const file = e.target.files[0];
		this.setState({file});
	};

	componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
		const {locationT} = this.props;
		if (!isEqual(locationT, prevProps.locationT)) {
			this.setState({
				location: locationT,
			});
		}
	}

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const {firestore, match, history} = this.props;
		const {location, file} = this.state;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		const firestoreRef = {
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
			}],
		};

		const locationWithoutActivities = omit(location, 'activities');
		firestore.set(firestoreRef, locationWithoutActivities);

		if (!!file) {
			// @ts-ignore: file cannot be null (see above)
			uploadFile(file, `images/locations/${locationId}`).then(
				() => history.push(routes.LOCATIONS_VIEW(tripId, locationId)));
		} else {
			history.push(routes.LOCATIONS_VIEW(tripId, locationId));
		}
	};

	handleCancel = (e: MouseEvent) => {
		e.preventDefault();

		const {locationT, history, match} = this.props;

		this.setState({
			location: locationT,
		});

		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];
		history.push(routes.LOCATIONS_VIEW(tripId, locationId));
	};

	handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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

	handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
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

	handleChangeDate = (name: string) => (date: Date | null) => {
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
		const {location, file} = this.state;
		const {title, description, startdate, enddate, address} = location;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		return (
			<div className={classes.locationEditPage}>
				<Typography
					variant='h4'
					gutterBottom={true}
				>
					Edit Location
				</Typography>

				<LocationMetadataInput
					onSubmit={this.handleSubmit}
					value={title}
					onChange={this.handleChangeInput}
					value1={description}
					obj={startdate}
					onChange1={this.handleChangeDate('startdate')}
					obj1={enddate}
					onChange2={this.handleChangeDate('enddate')}
					address={address}
					onChange3={this.handleChangeAddress}
					onClick={this.handleCancel}
					inputRef={this.fileInput}
					openFileDialog={this.openFileDialog}
					onChangeFileInput={this.handleChangeFileInput}
					locationId={locationId}
					pickedFile={file}
				/>

				<div className={classes.activitiesContainer}>
					<Typography
						variant='h5'
						gutterBottom={true}
					>
						Activities
					</Typography>
					{
						// @ts-ignore
						<ActivitiesSlider
							tripId={tripId}
							locationId={locationId}
						/>
					}
					<div className={classes.actionButtonsContainer}>
						<NavLink exact={true} to={routes.ACTIVITY_ADD(tripId, locationId)}>
							<Button
								className={classes.actionButton}
								variant='contained'
								color='primary'
								fullWidth={true}
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

export default compose(
	withRouter,
	firestoreConnect((props: Props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		const locationId = props.match.params[routes.URL_PARAM_LOCATION];
		return [{
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
			}],
		}];
	}),
	connect(
		({firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			const locationId = props.match.params[routes.URL_PARAM_LOCATION];
			return {
				locationT: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId],
			};
		},
	),
	withStyles(styles),
)(LocationEditPage);
