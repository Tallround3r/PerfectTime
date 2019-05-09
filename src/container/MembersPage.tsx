import {
	Button,
	createStyles,
	IconButton,
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
import {Edit, PersonAdd, PersonOutline} from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {Trip} from '../types/trip';
import {User} from '../types/user';
import {spinnerWhileLoading} from '../utils/firebaseUtils';


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
	followBtn: {
		marginLeft: theme.spacing.unit * 2,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	trip: Trip,
	auth: any,
	authUser: User,
}

class MembersPage extends React.Component<Props> {

	handleEditMembers = () => {
		const {history, match} = this.props;

		history.push(routes.TRIPS_EDIT(match.params[routes.URL_PARAM_TRIP]));
	};

	handleFollowUser = (userToFollow: any) => () => {
		const {auth} = this.props;
		const {authUser} = this.props;
		const {firestore} = this.props;

		if (!authUser.following) {
			authUser.following = [];
		}

		const firestoreRef = {
			collection: 'users',
			doc: auth.uid,
		};

		const following = [...authUser.following];
		following.push(userToFollow);
		const userUpdated = {
			...authUser,
			following,
		};

		firestore.set(firestoreRef, userUpdated);
	};

	handleUnfollowUser = (userToUnfollow: any) => () => {
		const {auth, authUser} = this.props;
		const {firestore} = this.props;

		const firestoreRef = {
			collection: 'users',
			doc: auth.uid,
		};

		const following = [...authUser.following];
		following.splice(following.indexOf(userToUnfollow), 1);
		const userUpdated = {
			...authUser,
			following,
		};

		firestore.set(firestoreRef, userUpdated);
	};

	render() {
		const {classes, trip, authUser} = this.props;
		console.log(trip);

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

				{!(isLoaded(trip))
					? 'Loading members...'
					: isEmpty(trip) || !trip.membersObj
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
								{Object.keys(trip.membersObj).map((memberIndex) => {
									// @ts-ignore
									const {id, username, firstName, lastName} = trip.membersObj[memberIndex] || {
										id: '',
										username: 'Loading...',
										firstName: '',
										lastName: '',
									};
									return (
										<TableRow key={`memberTableRow-${memberIndex}`}>
											<TableCell component='th' scope='row'>
												<NavLink exact={true} to={routes.USER_VIEW(id)}>
													{username}
												</NavLink>
												<span hidden={!authUser || id === this.props.auth.uid}>
													<span
														hidden={!!authUser && !!authUser.following
														&& authUser.following.indexOf(id) > -1}
													>
														<IconButton
															aria-label='Follow'
															onClick={this.handleFollowUser(id)}
															disabled={!authUser || id === this.props.auth.uid
															|| (!!authUser.following && authUser.following.indexOf(id) > -1)}
														>
														<PersonAdd fontSize={'small'}/>
														</IconButton>
													</span>
													<span
														hidden={!!authUser.following && !(authUser.following.indexOf(id) > -1)}
													>
												<IconButton
													aria-label='Stop Follow'
													onClick={this.handleUnfollowUser(id)}
													disabled={!authUser || id === this.props.auth.uid
													|| (!!authUser.following && !(authUser.following.indexOf(id) > -1))}

												>
													<PersonOutline fontSize={'small'}/>
												</IconButton>
													</span>
												</span>

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

const populates = [{child: 'members', root: 'users', keyProp: 'id', childAlias: 'membersObj'}];

export default compose(
	withRouter,
	connect(({firebase: {auth}}: any) => ({auth})),
	spinnerWhileLoading(['auth']),
	firestoreConnect((props: Props) => {
		const tripId = props.match.params[routes.URL_PARAM_TRIP];
		return [{
			collection: 'TRIPS',
			doc: tripId,
			populates,
		}, {
			collection: 'users',
			doc: props.auth.uid,
		}];
	}),
	connect(
		({firebase, firestore}: any, props: Props) => {
			const tripId = props.match.params[routes.URL_PARAM_TRIP];
			return {
				trip: populate(firestore, `TRIPS/${tripId}`, populates),
				authUser: firestore.data.users
					&& firestore.data.users[firebase.auth.uid],
			};
		},
	),
	withStyles(styles),
)(MembersPage);
