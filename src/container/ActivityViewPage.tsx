import React from 'react';
import {PhotoOutlined} from '@material-ui/icons';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import * as routes from '../constants/routes';
import {URL_PARAM_ACTIVITY, URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import {parseDateToString} from '../utils/parser';
import {connect} from 'react-redux';
import {Button, Paper, Typography, WithStyles, withStyles} from '@material-ui/core';
import styles from '../styles/ActivityViewStyles';
import Address from '../models/Address';
import {Activity} from '../types/activity';

interface ActivityViewPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
	activity: Activity,
}

interface State {
	activity: Activity,
}

const INITIAL_ACTIVITY: Activity = {
	title: '',
	description: '',
	startdate: null,
	enddate: null,
	address: new Address(),
};

class ActivityViewPage extends React.Component<ActivityViewPageProps, State> {

	state = {
		activity: this.props.activity || INITIAL_ACTIVITY,
	};

	componentDidUpdate(prevProps: ActivityViewPageProps, prevState: State) {
		const {activity} = this.props;
		if (activity !== prevProps.activity) {
			this.setState({
				activity,
			});
		}
	}

	render() {
		const {match, classes} = this.props;
		const {activity} = this.state;
		const {title, description, address, startdate, enddate} = activity;
		const tripId = match.params[URL_PARAM_TRIP];
		const locationId = match.params[URL_PARAM_LOCATION];
		const activityId = match.params[URL_PARAM_ACTIVITY];

		return (
			<div className={classes.activityViewPage}>
				<Typography
					variant='h4'
					gutterBottom={true}
				>
					{title}
				</Typography>
				<div>
					<Paper
						className={classes.imagePaper}
					>
						<PhotoOutlined
							className={classes.imageIcon}
						/>
					</Paper>
					<div className={classes.inputContainer}>
						<Paper className={classes.paperField}>
							<Typography>Description:</Typography>
							<Typography variant='h6'>{description}</Typography>
						</Paper>
						<div className={classes.inputHorizontalContainer}>
							<Paper className={classes.paperField}>
								<Typography>From:</Typography>
								<Typography
									variant='h6'>{parseDateToString(startdate)}</Typography>
							</Paper>
							<Paper className={classes.paperField}>
								<Typography>To:</Typography>
								<Typography variant='h6'>{parseDateToString(enddate)}</Typography>
							</Paper>
						</div>
						<hr/>
						<Typography
							className={classes.addressLabel}
							variant='subtitle2'
						>
							Address
						</Typography>
						<Paper className={classes.paperField}>
							<Typography>City:</Typography>
							<Typography variant='h6'>{address.zipCode} {address.city}</Typography>
						</Paper>
						<Paper className={classes.paperField}>
							<Typography>Country:</Typography>
							<Typography variant='h6'>{address.country}</Typography>
						</Paper>
						<hr/>
						<NavLink exact to={routes.ACTIVITY_EDIT(tripId, locationId, activityId)}>
							<Button
								color='primary'
								variant='contained'
								fullWidth
							>
								Edit Activity
							</Button>
						</NavLink>
					</div>
				</div>
			</div>
		);
	}
}


export default compose(withRouter,
	firestoreConnect((props: ActivityViewPageProps) => {
		const tripId = props.match.params[URL_PARAM_TRIP];
		const locationId = props.match.params[URL_PARAM_LOCATION];
		const activityId = props.match.params[URL_PARAM_ACTIVITY];
		return [
			`TRIPS/${tripId}/locations/${locationId}/activities/${activityId}`,
		];
	}),
	connect(
		({firestore: {data}}: any, props: ActivityViewPageProps) => {
			const tripId = props.match.params[URL_PARAM_TRIP];
			const locationId = props.match.params[URL_PARAM_LOCATION];
			const activityId = props.match.params[URL_PARAM_ACTIVITY];
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
)(ActivityViewPage);