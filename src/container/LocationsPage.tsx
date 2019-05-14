import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import LocationPanel from '../components/LocationPanel';
import * as routes from '../constants/routes';
import {Location, Trip} from '../types';
import {parseDateIfValid} from '../utils/parser';


const styles = (theme: Theme) => createStyles({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		background: theme.palette.secondary.main,
	},
	bigColumn: {
		flexBasis: '50%',
		textAlign: 'center',
	},
	smallColumn: {
		flexBasis: '1%',
		textAlign: 'right',
	},
	borderLeft: {
		borderLeft: 'thin solid #000000',
		height: '100px',
	},
	hrLine: {
		width: '1px',
		height: '67px',
	},
	activitiesContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		width: '100%',
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 5,
		right: theme.spacing.unit * 5,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	trip: Trip;
	locations: { [id: string]: Location },
}

interface State {
	expanded: any;
}

class LocationsPage extends React.Component<Props, State> {

	state = {
		expanded: null,
	};

	handleExpansionPanelChange = (panel: any) => (event: any, expanded: any) => {
		this.setState({
			expanded: expanded ? panel : null,
		});
	};

	render() {
		const {classes, trip, locations, match} = this.props;
		const {expanded} = this.state;
		const tripId = match.params[routes.URL_PARAM_TRIP];

		return (
			<div>
				<h1>
					Locations {isLoaded(trip) && !isEmpty(trip) && ` of Trip "${trip.title}"`}
				</h1>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								const location = locations[key];
								const startdate = parseDateIfValid(locations[key].startdate);
								const enddate = parseDateIfValid(locations[key].enddate);
								return (
									<LocationPanel
										key={key}
										id={key}
										classes={classes}
										expanded={expanded}
										onChange={this.handleExpansionPanelChange(key)}
										location={location}
										startdate={startdate}
										enddate={enddate}
										tripId={tripId}
									/>
								);
							})}
				</div>

				<NavLink exact={true} to={routes.LOCATIONS_ADD(tripId)}>
					<Tooltip
						title='Add'
						aria-label='Add'
						placement='bottom'
					>
						<Fab
							className={classes.fab}
							color='primary'
							aria-label='Add'
						>
							<AddIcon/>
						</Fab>
					</Tooltip>
				</NavLink>
			</div>
		);
	}
}

export default compose(
	withRouter,
	firestoreConnect((props: Props) => [{
		collection: 'TRIPS',
		doc: props.match.params[routes.URL_PARAM_TRIP],
	}, {
		collection: 'TRIPS',
		doc: props.match.params[routes.URL_PARAM_TRIP],
		subcollections: [{
			collection: 'locations',
		}],
	}]),
	connect(
		({firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				trip: data.TRIPS
					&& data.TRIPS[tripId],
				locations: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations,
			};
		},
	),
	withStyles(styles),
)(LocationsPage);
