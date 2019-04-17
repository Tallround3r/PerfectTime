import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
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
import React, {MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import * as routes from '../constants/routes';
import {Trip} from '../types/trip';
import {parseDateIfValid} from '../utils/parser';


const styles = (theme: Theme) => createStyles({
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

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	trips: { [id: string]: Trip };
}

interface State {
	expanded: any;
}

class TripsPage extends React.Component<Props, State> {

	state = {
		expanded: null,
	};

	handleClickEditButton = (tripId: string) => (e: MouseEvent) => {
		e.preventDefault();

		const {history} = this.props;

		history.push(routes.TRIPS_EDIT(tripId));
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
							const trip = trips[key];
							const startdate = parseDateIfValid(trip.startdate);
							const enddate = parseDateIfValid(trip.enddate);
							return (
								<div key={key}>
									<ExpansionPanel
										className={classes.locationPanel}
										expanded={false}
									>
										<ExpansionPanelSummary>
											<div className={classes.smallColumn}>
												<Avatar className={classes.iconAvatar}>
													<DirectionsWalk fontSize='large'/>
												</Avatar>
											</div>
											<div className={classes.bigColumn}>
												<NavLink exact={true} to={routes.LOCATIONS(key)}>
													<Typography
														variant={'h6'}
													>
														{trip.title}
													</Typography>
												</NavLink>
											</div>
											<div className={classes.bigColumn}>
												<Typography>
													from {!!startdate && `${startdate.getMonth()}/${startdate.getDate()}/${startdate.getFullYear()}`}
												</Typography>
												<Typography>
													to {!!enddate && `${enddate.getMonth()}/${enddate.getDate()}/${enddate.getFullYear()}`}
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

				<NavLink exact={true} to={routes.TRIPS_ADD()}>
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
	}]),
	connect(
		({firestore: {data}}: any, props: Props) => {
			return {
				trips: data.TRIPS,
			};
		},
	),
	withStyles(styles),
)(TripsPage);
