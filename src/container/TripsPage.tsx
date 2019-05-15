import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
import Fab from '@material-ui/core/Fab/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import firebase from 'firebase';
import React, {MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import TripPanel from '../components/TripPanel';
import {FB_FUNC_DELETE_TRIP} from '../constants/firebase-constants';
import * as routes from '../constants/routes';
import {Trip} from '../types';
import {isUserOfTrip} from '../utils/authUtils';


const styles = (theme: Theme) => createStyles({
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
	trips: { [id: string]: Trip };
	auth: any;
}

interface State {
	expanded: any;
}

class TripsPage extends React.Component<Props, State> {

	state = {
		expanded: null,
	};

	handleEditBtnClicked = (tripId: string) => (e: MouseEvent) => {
		e.preventDefault();

		const {history} = this.props;

		history.push(routes.TRIPS_EDIT(tripId));
	};

	handleDeleteBtnClicked = (tripId: string) => (e: MouseEvent) => {
		e.preventDefault();

		// TODO: open dialog for confirming trip deletion

		const path = `TRIPS/${tripId}`;

		const deleteFn = firebase.functions().httpsCallable(FB_FUNC_DELETE_TRIP);
		deleteFn({path})
			.then((result) => {
				console.log('Delete success: ' + JSON.stringify(result));
			})
			.catch((err) => {
				console.warn(err);
			});

	};

	render() {
		const {classes, trips, auth} = this.props;

		return (
			<div>
				<h1>Trips</h1>
				{!isLoaded(trips)
					? 'Loading Trips...'
					: isEmpty(trips)
						? 'No Trips created yet.'
						: Object.keys(trips)
							.filter((key) => (!!trips[key] && trips[key].public) || isUserOfTrip(trips[key], auth))
							.map((key) => {
								return (
									<TripPanel
										key={key}
										id={key}
										trip={trips[key]}
										showEditBtn={isUserOfTrip(trips[key], auth)}
										showDeleteBtn={trips[key].owner === auth.uid}
										onEdit={this.handleEditBtnClicked(key)}
										onDelete={this.handleDeleteBtnClicked(key)}
									/>
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
		({firebase: {auth}, firestore: {data}}: any, props: Props) => {
			return {
				auth,
				trips: data.TRIPS,
			};
		},
	),
	withStyles(styles),
)(TripsPage);
