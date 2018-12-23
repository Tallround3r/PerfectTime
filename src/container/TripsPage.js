import {withStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import * as routes from '../constants/routes';
import PictureStar from '../images/star.jpg';
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

class TripsPage extends React.Component {

	state = {
		expanded: null,
	};

	handleExpansionPanelChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : null,
		});
	};

	render() {
		const {classes, trips} = this.props;
		const {expanded} = this.state;

		return (
			<div>
				<h1>Trips</h1>
				<div>
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
											expanded={expanded === key}
											onChange={this.handleExpansionPanelChange(key)}
										>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src={PictureStar}/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{trip.title}</Typography>
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
													<NavLink exact to={routes.LOCATIONS(key)}>
														<Avatar>
															<ArrowRightIcon/>
														</Avatar>
													</NavLink>
												</div>
											</ExpansionPanelSummary>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>
			</div>
		);
	}
}

TripsPage.propTypes = {
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
