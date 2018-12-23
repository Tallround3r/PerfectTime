import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ActivitiesSlider from '../components/ActivitiesSlider';
import * as routes from '../constants/routes';
import {URL_PARAM_TRIP} from '../constants/routes';
import PictureStar from '../images/star.jpg';
import {Trip} from '../models';
import {parseDateIfValid} from '../utils/parser';


const styles = theme => ({
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

class LocationsPage extends React.Component {

	state = {
		expanded: null,
	};

	handleExpansionPanelChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : null,
		});
	};

	render() {
		const {classes, trip, locations, match} = this.props;
		const {expanded} = this.state;
		const tripId = match.params[URL_PARAM_TRIP];

		return (
			<div>
				<h1>
					{isLoaded(trip) && !isEmpty(trip) && `${trip.title} — `}
					Locations
				</h1>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								let location = locations[key];
								let startdate = parseDateIfValid(locations[key].startdate);
								let enddate = parseDateIfValid(locations[key].enddate);
								return (
									<div key={key}>
										<ExpansionPanel
											className={classes.locationPanel}
											expanded={expanded === key}
											onChange={this.handleExpansionPanelChange(key)}
										>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src={PictureStar}/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{location.title}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Start
														Date: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>End
														Date: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].description}</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact to={routes.LOCATIONS_VIEW(tripId, key)}>
														<Avatar>
															<ArrowRightIcon/>
														</Avatar>
													</NavLink>
												</div>
											</ExpansionPanelSummary>

											<ExpansionPanelDetails>
												<div style={{width: '100%'}}>
													<ActivitiesSlider
														tripId={tripId}
														locationId={key}
													/>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>

				<NavLink exact to={routes.LOCATIONS_ADD(tripId)}>
					<Tooltip
						title="Add"
						aria-label="Add"
						placement="bottom"
					>
						<Fab
							className={classes.fab}
							color="primary"
							aria-label="Add"
						>
							<AddIcon/>
						</Fab>
					</Tooltip>
				</NavLink>
			</div>
		);
	}
}

LocationsPage.propTypes = {
	match: PropTypes.object.isRequired,
	trip: PropTypes.objectOf(Trip),
	locations: PropTypes.object,
};

export default compose(
	withRouter,
	firestoreConnect((props) => [{
		collection: 'TRIPS',
		doc: props.match.params[URL_PARAM_TRIP],
	}, {
		collection: 'TRIPS',
		doc: props.match.params[URL_PARAM_TRIP],
		subcollections: [{
			collection: 'locations',
		}],
	}]),
	connect(
		({firestore: {data}}, props) => {
			const tripId = props.match.params[URL_PARAM_TRIP];
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
