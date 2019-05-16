import {createStyles, Dialog, Theme, WithStyles, withStyles} from '@material-ui/core';
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
import ConfirmDialog from '../components/ConfirmDialog';
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
	openDeleteDialog: boolean;
	tripToDelete: string | null;
}

class TripsPage extends React.Component<Props, State> {

	state = {
		expanded: null,
		openDeleteDialog: false,
		tripToDelete: null,
	};

	handleConfirmDeleteTrip = (e: MouseEvent) => {
		e.preventDefault();
		const {tripToDelete} = this.state;

		if (!tripToDelete) {
			console.error('No trip ID defined while trying to delete trip', tripToDelete);
			return;
		}

		const path = `TRIPS/${tripToDelete}`;
		const deleteFn = firebase.functions().httpsCallable(FB_FUNC_DELETE_TRIP);

		this.setState({
			openDeleteDialog: false,
			tripToDelete: null,
		});
		// TODO: set loading circle for download button

		deleteFn({path})
			.then((result) => {
				console.log('Delete success: ' + JSON.stringify(result));
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	handleCancelDeleteTrip = (e: MouseEvent) => {
		this.setState({
			openDeleteDialog: false,
			tripToDelete: null,
		});
	};

	handleEditBtnClicked = (tripId: string) => (e: MouseEvent) => {
		e.preventDefault();
		const {history} = this.props;

		history.push(routes.TRIPS_EDIT(tripId));
	};

	handleDeleteBtnClicked = (tripId: string) => (e: MouseEvent) => {
		e.preventDefault();

		this.setState({
			tripToDelete: tripId,
			openDeleteDialog: true,
		});
	};

	render() {
		const {classes, trips, auth} = this.props;

		return (
			<React.Fragment>
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

				<ConfirmDialog
					content={'Are you sure you want to delete this trip and all its locations and activities?\n' +
					'This action can not be undone.'}
					open={this.state.openDeleteDialog}
					onConfirm={this.handleConfirmDeleteTrip}
					onCancel={this.handleCancelDeleteTrip}
				/>
			</React.Fragment>
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
