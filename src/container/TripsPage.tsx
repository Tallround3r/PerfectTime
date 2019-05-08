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
import TripPanel from '../components/TripPanel';
import * as routes from '../constants/routes';
import {Trip} from '../types';


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
						: Object.keys(trips)
							.filter((key) => !!trips[key])
							.map((key) => {
								return (
									<TripPanel
										key={key}
										trip={trips[key]}
										onEdit={this.handleClickEditButton(key)}
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
		({firestore: {data}}: any, props: Props) => {
			return {
				trips: data.TRIPS,
			};
		},
	),
	withStyles(styles),
)(TripsPage);
