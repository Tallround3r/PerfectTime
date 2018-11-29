import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {withStyles} from '@material-ui/core';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Chip from '@material-ui/core/Chip';
import ActivitiesList from '../components/ActivitiesList';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TRIP_ID = 'TXjQVQjjfXRfBnCJ1q0L';

const styles = theme => ({
	locationPanel: {
		border: 'thin solid #000000',
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		background: '#aff4ff'
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
	}
});

class LocationsPage extends React.Component {

	showAllLocations() {
	}

	searchLocations() {

	}

	render() {
		const {classes, locations} = this.props;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<div>
				<h1>Locations</h1>
				{/*
-----------------------------------------------------------------------------------------------------------------------
							Overview with carousel in ExpansionPanel
-----------------------------------------------------------------------------------------------------------------------
*/}
				<p><b>Overview with carousel in ExpansionPanel</b></p>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								let location = locations[key];
								let startdate = new Date(locations[key].startdate.seconds * 1000);
								let enddate = new Date(locations[key].enddate.seconds * 1000);
								return (
									<div key={key}>
										{/*
***********************************************************************************************************************
											ExpansionPanel
***********************************************************************************************************************
*/}
										<ExpansionPanel className={classes.locationPanel}>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src="/images/star.jpg"/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{location.title}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].description}</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact
															 to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
												</div>
											</ExpansionPanelSummary>

											<ExpansionPanelDetails>
												<div style={{width: '100%'}}>
													<Slider {...settings}>
														<div>
															<h3>1</h3>
														</div>
														<div>
															<h3>2</h3>
														</div>
														<div>
															<h3>3</h3>
														</div>
														<div>
															<h3>4</h3>
														</div>
														<div>
															<h3>5</h3>
														</div>
														<div>
															<h3>6</h3>
														</div>
													</Slider>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>
				<br/>
				<hr/>
				<br/>
				{/*
-----------------------------------------------------------------------------------------------------------------------
									Overview with scrollbar
-----------------------------------------------------------------------------------------------------------------------
*/}
				<p><b>Overview with scrollbar</b></p>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								let location = locations[key];
								let startdate = new Date(locations[key].startdate.seconds * 1000);
								let enddate = new Date(locations[key].enddate.seconds * 1000);
								return (
									<div key={key}>
										{/*
***********************************************************************************************************************
									ExpansionPanel with GridList from ActivitiesList.js
***********************************************************************************************************************
*/}
										<ExpansionPanel className={classes.locationPanel}>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src="/images/star.jpg"/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{location.title}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].description}</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact
															 to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
												</div>
											</ExpansionPanelSummary>

											<ExpansionPanelDetails>
												<div style={{width: '100%'}}>
													<ActivitiesList tripId={TRIP_ID} locationId={key}/>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>
				<br/>
				<hr/>
				<br/>
				{/*
-----------------------------------------------------------------------------------------------------------------------
									Carousel
-----------------------------------------------------------------------------------------------------------------------
*/}
				<p><b>Carousel</b></p>
				<Slider {...settings}>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Slider>
				<br/>
				<hr/>
				<br/>
				{/*
-----------------------------------------------------------------------------------------------------------------------
						Overview with vertical line next to activities
-----------------------------------------------------------------------------------------------------------------------
*/}
				<p><b>Overview with vertical line next to activities</b></p>
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								let startdate = new Date(locations[key].startdate.seconds * 1000);
								let enddate = new Date(locations[key].enddate.seconds * 1000);
								return (
									<div key={key}>
										<ExpansionPanel className={classes.locationPanel}>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src="/images/star.jpg"/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].title}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{locations[key].description}</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact
															 to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
												</div>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails>
												<div className={classes.smallColumn}
													 style={{borderLeft: 'thin solid #000000'}}>
													<Chip
														label="Activity 1"
														component="a"
														href={routes.ACTIVITY_EDIT}
														clickable
														variant="outlined"
													/>
													<Typography><br/></Typography>
													<Chip label="Activity 2" variant="outlined"/>
													<Typography><br/></Typography>
													<Chip label="Activity 3" variant="outlined"/>
													<Typography><br/></Typography>
													<Chip label="Activity 4" variant="outlined"/>
													<Typography><br/></Typography>
													<Chip label="Activity 5" variant="outlined"/>
													<Typography><br/></Typography>
													<Chip label="Activity 5" variant="outlined"/>
													<Typography><br/></Typography>
													<Chip label="Activity 6" variant="outlined"/>
													<Typography><br/></Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Startdate Activity 1</Typography>
													<Typography>Startdate Activity 2</Typography>
													<Typography>Startdate Activity 3</Typography>
													<Typography>Startdate Activity 4</Typography>
													<Typography>Startdate Activity 5</Typography>
													<Typography>Startdate Activity 6</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Hallo</Typography>
												</div>
											</ExpansionPanelDetails>
										</ExpansionPanel>
									</div>
								);
							})}
				</div>
				<hr/>
				<br/>
				{/*
-----------------------------------------------------------------------------------------------------------------------
						Old version
-----------------------------------------------------------------------------------------------------------------------
*/}
				<p><b>old version</b></p>
				{/* old version with hrLine */}
				<div>
					{!isLoaded(locations)
						? 'Loading...'
						: isEmpty(locations)
							? 'No Locations created yet.'
							: Object.keys(locations).map((key) => {
								let label = locations[key].title;
								let startdate = new Date(locations[key].startdate.seconds * 1000);
								let enddate = new Date(locations[key].enddate.seconds * 1000);
								return (
									<div key={key}>
										<ExpansionPanel className={classes.locationPanel} key={key}>
											<ExpansionPanelSummary>
												<div className={classes.smallColumn}>
													<Avatar src="/images/star.jpg"/>
												</div>
												<div className={classes.bigColumn}>
													<Typography>{label}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Startdate: {startdate.getDate()}.{startdate.getMonth()}.{startdate.getFullYear()}</Typography>
													<Typography>Enddate: {enddate.getDate()}.{enddate.getMonth()}.{enddate.getFullYear()}</Typography>
												</div>
												<div className={classes.bigColumn}>
													<Typography>Owner</Typography>
												</div>
												<div className={classes.smallColumn}>
													<NavLink exact to={routes.LOCATIONS_EDIT}><Avatar><ArrowRightIcon/></Avatar></NavLink>
												</div>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails>
												<Typography>
													description
													<br/>
													description
												</Typography>
											</ExpansionPanelDetails>
										</ExpansionPanel>
										<GridList cols={37} cellHeight={'auto'}>
											<GridListTile></GridListTile>
											<GridListTile>
												<hr className={classes.hrLine}/>
											</GridListTile>
											<GridListTile style={{width: 'auto'}}>
												<br/>
												<NavLink exact to={routes.LOCATIONS_ADD}>
													<Avatar><AddIcon/></Avatar>
												</NavLink>
											</GridListTile>
										</GridList>
									</div>
								);
							})}
				</div>
			</div>
		);
	}
}

export default compose(
	firestoreConnect((props) => [
		`TRIPS/${TRIP_ID}/locations`,
	]),
	connect(
		({firestore: {data}}, props) => ({
			locations: data.TRIPS && data.TRIPS[TRIP_ID] && data.TRIPS[TRIP_ID].locations,
		}),
	),
	withStyles(styles),
)(LocationsPage);
