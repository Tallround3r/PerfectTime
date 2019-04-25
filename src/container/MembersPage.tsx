import {
	Button,
	createStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Theme,
	Typography,
	WithStyles,
	withStyles,
} from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {Trip} from '../types/trip';
import {User} from '../types/user';

const styles = (theme: Theme) => createStyles({
	root: {
		paddingTop: theme.spacing.unit * 3,
	},
	editBtnContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit * 4,
		float: 'right',
	},
	editIcon: {
		marginRight: theme.spacing.unit,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	trip: Trip,
	users: User[],
}

class MembersPage extends React.Component<Props> {

	handleEditMembers = () => {
		const {history, match} = this.props;

		history.push(routes.TRIPS_EDIT(match.params[routes.URL_PARAM_TRIP]));
	};

	render() {
		const {classes, users, trip} = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.editBtnContainer}>
					<Button
						variant={'outlined'}
						onClick={this.handleEditMembers}
					>
						<Edit className={classes.editIcon}/>
						Edit Members
					</Button>
				</div>

				<Typography
					variant='h4'
					gutterBottom={true}
				>
					Members
				</Typography>

				{!(isLoaded(trip) && isLoaded(users))
					? 'Loading members...'
					: isEmpty(trip) || !trip.members || trip.members.length === 0
						? 'No members added.' :
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Username</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{trip.members.map((userId) => {
									// @ts-ignore
									const {username, firstName, lastName} = users[userId] || {
										username: 'Loading...',
										firstName: '',
										lastName: '',
									};
									return (
										<TableRow key={userId}>
											<TableCell component='th' scope='row'>
												{username}
											</TableCell>
											<TableCell>
												{firstName}
											</TableCell>
											<TableCell>
												{lastName}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
				}
			</div>
		);
	}
}

export default compose(
	withRouter,
	firestoreConnect((props: Props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		return [{
			collection: 'TRIPS',
			doc: tripId,
		}, {
			collection: 'users',
		}];
	}),
	connect(
		({firebase, firestore: {data}}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				trip: data.TRIPS
					&& data.TRIPS[tripId],
				users: data.users,
			};
		},
	),
	withStyles(styles),
)(MembersPage);
