import {createStyles, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import ActivitiesSlider from '../components/ActivitiesSlider';
import * as routes from '../constants/routes';
import {Location} from '../types/location';
import LocationMetadata from "../components/LocationMetadata";
import * as React from "react";


const styles = (theme: Theme) => createStyles({
	locationViewPage: {
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
	inputHorizontalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
	},
	imagePaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing.unit,
		float: 'right',
		width: '30em',
		height: '20em',
	},
	imageIcon: {
		fontSize: '10em',
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
	},
	paperField: {
		width: '100%',
		height: 'auto',
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	tripLocation: Location;
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


class LocationViewPage extends React.Component<Props> {

	render() {
		const {classes, match, tripLocation} = this.props;
		const {title, description, startdate, enddate, address} = tripLocation || INITIAL_LOCATION;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		const locationId = match.params[routes.URL_PARAM_LOCATION];

		return (
			<div className={classes.locationViewPage}>
				<LocationMetadata title={title} classes={classes} description={description} timestamp={startdate}
								  timestamp1={enddate} address={address} tripId={tripId} locationId={locationId}/>

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
			`TRIPS/${tripId}/locations/${locationId}`,
		];
	}),
	connect(
		({firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			const locationId = props.match.params[routes.URL_PARAM_LOCATION];
			return {
				tripLocation: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations
					&& data.TRIPS[tripId].locations[locationId],
			};
		},
	),
	withStyles(styles),
)(LocationViewPage);
