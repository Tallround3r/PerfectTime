import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
import Fab from '@material-ui/core/Fab/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React, {MouseEvent} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ConfirmDialog from '../components/ConfirmDialog';
import TripPanel from '../components/TripPanel';
import * as routes from '../constants/routes';
import {Trip} from '../types';
import {isUserOfTrip} from '../utils/authUtils';
import {setSearchText} from '../store/actions/searchAction';


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
	auth: any;
	firestore: any;
	trips: { [id: string]: Trip };
	searchText: string;
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

	componentDidMount(): void {
		this.props.firestore.get('TRIPS');
	}

	handleConfirmDeleteTrip = (e: MouseEvent) => {
		e.preventDefault();
		const {firestore} = this.props;
		const {tripToDelete} = this.state;

		if (!tripToDelete) {
			console.error('No trip ID defined while trying to delete trip', tripToDelete);
			return;
		}

		const firestoreRef = {
			collection: 'TRIPS',
			doc: tripToDelete,
		};
		firestore.delete(firestoreRef)
			.then(() => {
				this.setState({
					openDeleteDialog: false,
					tripToDelete: null,
				});
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

	tripNameIncludesSearchString = (tripId: string) => {
		return this.props.trips[tripId].title.toLowerCase().includes(this.props.searchText.toLowerCase());
		// return true;
	};

	render() {
		const {classes, trips, auth} = this.props;
		console.log(trips);

		return (
			<React.Fragment>
				<h1>Trips</h1>
				{!isLoaded(trips)
					? 'Loading Trips...'
					: isEmpty(trips)
						? 'No Trips created yet.'
						: Object.keys(trips)
							.filter((key) => (!!trips[key] && trips[key].public) || isUserOfTrip(trips[key], auth) && this.tripNameIncludesSearchString(key))
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
	firestoreConnect(),
	connect(
		({firebase: {auth}, firestore: {data}, searchString}: any, props: Props) => {
			return {
				auth,
				trips: data.TRIPS,
				searchText: searchString,
			};
		},
	),
	withStyles(styles),
)(TripsPage);
