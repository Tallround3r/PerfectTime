import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import * as routes from '../constants/routes';
import {parseDateIfValid} from '../utils/parser';


const styles = theme => ({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		background: theme.palette.secondary.main,
		cursor: 'default',
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
	iconAvatar: {
		color: '#000',
	},
});

class TripsPage extends React.Component {

	state = {
		expanded: null,
	};

	handleClickEditButton = (tripId) => (e) => {
		const {history} = this.props;

		history.push(routes.TRIPS_EDIT(tripId));
		e.preventDefault();
	};

	render() {
		const {classes, trips} = this.props;

		return (
			<div>
				<h1>Trips</h1>
				{!isLoaded(trips)
					? 'Loading Trips...'
					: isEmpty(trips)
						? 'No Trips created yet.'
						: Object.keys(trips).map((key) => {
							let trip = trips[key];
							let startdate = parseDateIfValid(trip.startdate);
							let enddate = parseDateIfValid(trip.enddate);
							return (
								<div key={key}>
									<ExpansionPanel
										className={classes.locationPanel}
										expanded={false}
									>
										<ExpansionPanelSummary>
											<div className={classes.smallColumn}>
												<Avatar className={classes.iconAvatar}>
													<DirectionsWalk fontSize="large"/>
												</Avatar>
											</div>
											<div className={classes.bigColumn}>
												<NavLink exact to={routes.LOCATIONS(key)}>
													<Typography
														variant={'h6'}
													>
														{trip.title}
													</Typography>
												</NavLink>
											</div>
											<div className={classes.bigColumn}>
												<Typography>
													from {startdate.getMonth()}/{startdate.getDate()}/{startdate.getFullYear()}
												</Typography>
												<Typography>
													to {enddate.getMonth()}/{enddate.getDate()}/{enddate.getFullYear()}
												</Typography>
											</div>
											<div className={classes.bigColumn}>
												<Typography>{trip.description}</Typography>
											</div>
											<div className={classes.smallColumn}>
												<IconButton onClick={this.handleClickEditButton(key)}>
													<EditIcon/>
												</IconButton>
											</div>
										</ExpansionPanelSummary>
									</ExpansionPanel>
								</div>
							);
						})}

				<NavLink exact to={routes.TRIPS_ADD()}>
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

TripsPage.propTypes = {
	history: PropTypes.object.isRequired,
	trips: PropTypes.object,
};

export default compose(
	withRouter,
	firestoreConnect((props) => [{
		collection: 'TRIPS',
	}]),
	connect(
		({firestore: {data}}, props) => {
			return {
				trips: data.TRIPS,
			};
		},
	),
	withStyles(styles),
)(TripsPage);
