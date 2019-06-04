import {createStyles, InputBase, Theme, WithStyles, withStyles} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React, {ChangeEvent} from 'react';
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
import {isUserOfTrip} from '../utils/authUtils';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import {setSearchText} from '../store/actions/searchAction';


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
	firestore: any;
	searchText: string;
	setSearchText: any;
}

interface State {
	expanded: any;
}

class LocationsPage extends React.Component<Props, State> {

	state = {
		expanded: null,
	};

	componentDidMount(): void {
		const {firestore, match} = this.props;
		const tripId = match.params[routes.URL_PARAM_TRIP];
		firestore.get(`TRIPS/${tripId}`);
		firestore.get(`TRIPS/${tripId}/locations`);
		this.props.setSearchText('');
	}

	handleExpansionPanelChange = (panel: any) => (event: any, expanded: any) => {
		this.setState({
			expanded: expanded ? panel : null,
		});
	};

	locationNameIncludesSearchString = (locationId: string) => {
		return this.props.locations[locationId].title.toLowerCase().includes(this.props.searchText.toLowerCase());
	};

	setSearchString = (e: ChangeEvent<HTMLInputElement>) => {
		this.props.setSearchText(e.target.value);
	};

	render() {
		const {classes, trip, locations, match} = this.props;
		const {expanded} = this.state;
		const tripId = match.params[routes.URL_PARAM_TRIP];

		return (
			<React.Fragment>
				<div>
					<h1>
						Locations {isLoaded(trip) && !isEmpty(trip) && ` of Trip "${trip.title}"`}
					</h1>
				</div>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).filter((key) => (this.locationNameIncludesSearchString(key)))
								.map((key) => {
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
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		setSearchText: (text: string) => dispatch(setSearchText(text)),
	};
};

export default compose(
	withRouter,
	firestoreConnect(),
	connect(
		({firestore: {data}, searchString}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				trip: data.TRIPS
					&& data.TRIPS[tripId],
				locations: data.TRIPS
					&& data.TRIPS[tripId]
					&& data.TRIPS[tripId].locations,
				searchText: searchString,
			};
		}, mapDispatchToProps,
	),
	withStyles(styles),
)(LocationsPage);
