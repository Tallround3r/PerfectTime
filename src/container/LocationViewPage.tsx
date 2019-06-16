import {createStyles, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import React, {MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import ActivitiesSlider from '../components/ActivitiesSlider';
import ConfirmDialog from '../components/ConfirmDialog';
import LocationMetadata from '../components/LocationMetadataView';
import * as routes from '../constants/routes';
import {Location, Trip} from '../types';
import {isUserOfTrip} from '../utils/authUtils';


const styles = (theme: Theme) => createStyles({
	locationViewPage: {
		paddingTop: theme.spacing.unit * 3,
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	trip: Trip,
	tripLocation: Location;
	firestore: any;
	auth: any,
}

interface State {
	openDeleteDialog: boolean;
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


class LocationViewPage extends React.Component<Props, State> {
	state = {
		openDeleteDialog: false,
	};

	handleConfirmDeleteLocation = (e: MouseEvent) => {
		e.preventDefault();
		const {firestore, match, history} = this.props;
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
		firestore.delete(firestoreRef)
			.then(() => {
				this.setState({
					openDeleteDialog: false,
				});
				history.push(routes.LOCATIONS(tripId));
			});
	};

	handleCancelDeleteLocation = (e: MouseEvent) => {
		this.setState({
			openDeleteDialog: false,
		});
	};

	handleDeleteBtnClicked = (e: MouseEvent) => {
		e.preventDefault();

		this.setState({
			openDeleteDialog: true,
		});
	};

	gotoEditPage = (event: MouseEvent) => {
		event.preventDefault();
		const {history, match} = this.props;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];
		history.push(routes.LOCATIONS_EDIT(tripId, locationId));
	};

	render() {
		const {classes, match, tripLocation, trip, auth} = this.props;
		const {title, description, startdate, enddate, address} = tripLocation || INITIAL_LOCATION;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		return (
			<div className={classes.locationViewPage}>
				<LocationMetadata
					title={title}
					description={description}
					timestamp={startdate}
					timestamp1={enddate}
					address={address}
					locationId={locationId}
					showEditBtn={isUserOfTrip(trip, auth)}
					showDeleteBtn={trip && auth && trip.owner === auth.uid}
					onDeleteLocation={this.handleDeleteBtnClicked}
					routeEditPage={this.gotoEditPage}
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
				</div>

				<ConfirmDialog
					content={'Are you sure you want to delete this location and all its activities?\n' +
					'This action can not be undone.'}
					open={this.state.openDeleteDialog}
					onConfirm={this.handleConfirmDeleteLocation}
					onCancel={this.handleCancelDeleteLocation}
				/>
			</div>
		);
	}

}

export default compose(
	withRouter,
	firestoreConnect((props: Props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		const locationId = props.match.params[routes.URL_PARAM_LOCATION];
		return [
			`TRIPS/${tripId}`,
			`TRIPS/${tripId}/locations/${locationId}`,
		];
	}),
	connect(
		({firebase: {auth}, firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			const locationId = props.match.params[routes.URL_PARAM_LOCATION];
			return {
				auth,
				trip: data.TRIPS
					&& data.TRIPS[tripId],
				tripLocation: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId],
			};
		},
	),
	withStyles(styles),
)(LocationViewPage);
