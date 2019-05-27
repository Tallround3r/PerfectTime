import {createStyles, Theme, Typography, WithStyles, withStyles} from '@material-ui/core';
import React, {ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import ActivitiesSlider from '../components/ActivitiesSlider';
import LocationMetadata from '../components/LocationMetadataView';
import * as routes from '../constants/routes';
import {Location} from '../types/location';


const styles = (theme: Theme) => createStyles({
	locationViewPage: {
		paddingTop: theme.spacing.unit * 3,
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 6,
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
	fileInput: React.RefObject<any>;

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
		console.log(file);
		this.setState({file});
	};

	render() {
		const {classes, match, tripLocation} = this.props;
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
					tripId={tripId}
					locationId={locationId}
					openFileDialog={this.openFileDialog}
					onChangeFileInput={this.handleChangeFileInput}
					inputRef={this.fileInput}
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
