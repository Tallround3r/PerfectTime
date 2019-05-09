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
import {PersonAdd, PersonOutline} from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded, populate} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
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
	icon: {
		margin: theme.spacing.unit * 2,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	user: User;
	users: User[],
 authUser: User,
	auth: any,
}

class UsersFollowedPage extends React.Component<Props> {

	handleFollowUser = (userToFollow: any) => () => {
		const {auth, authUser} = this.props;
		const {firestore} = this.props;

		if (!authUser.following) {
            authUser.following = []; }

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
		const {user, classes, users, authUser} = this.props;

		return (
			<div className={classes.root}>

				<Typography
					variant='h4'
					gutterBottom={true}
				>
					{user.username} follows:
				</Typography>

				{!(isLoaded(user) && isLoaded(authUser) && isLoaded(users))
					? 'Loading followed user...'
					: isEmpty(user) || !user.following || user.following.length === 0
						? 'No other users.' :
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Username</TableCell>
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{user.following.map((userId) => {
									// @ts-ignore
									const {username, firstName, lastName} = users[userId] || {
										username: 'Loading...',
										firstName: '',
										lastName: '',
									};
									return (
										<TableRow key={userId}>

											<TableCell component='th' scope='row'>
                                                <NavLink exact={true} to={routes.USER_VIEW(userId)}>
												{username}
                                                </NavLink>
                                                <span hidden={!authUser || userId == this.props.auth.uid}>

                                                    <span hidden={!!authUser.following && authUser.following.indexOf(userId) > -1}>
                                                    <Button
													onClick={this.handleFollowUser(userId)}
													disabled={!authUser || userId == this.props.auth.uid || (!!authUser.following && authUser.following.indexOf(userId) > -1)}

												    >
													    <PersonAdd className={classes.icon}/>
												    </Button>
                                                    </span>
                                                    <span hidden={!!authUser.following && !(authUser.following.indexOf(userId) > -1)}>
												<Button
													onClick={this.handleUnfollowUser(userId)}
													disabled={!authUser || userId == this.props.auth.uid || (!!authUser.following && !(authUser.following.indexOf(userId) > -1))}

												>
													<PersonOutline className={classes.icon}/>
												</Button>
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

				<NavLink exact={true} to={routes.USER_VIEW(this.props.match.params[routes.URL_PARAM_USER])} >
					<Button
						color='primary'
						variant='contained'
						fullWidth={true}
					>
						Return to Account
					</Button>
				</NavLink>

			</div>
		);
	}
}
const populates = [{child: 'following', root: 'users', keyProp: 'id', childAlias: 'followingObj'}];

export default compose(
	withRouter,
    connect(({firebase: {auth}}: any) => ({auth})),
    spinnerWhileLoading(['auth']),
	firestoreConnect((props: Props) => {
		const userId = props.match.params[routes.URL_PARAM_USER];
		return [{
			collection: 'users',
			doc: userId,
   populates,
		}, {
			collection: 'users',
   doc: props.auth.uid
		}];
	}),
	connect(
		({firebase, firestore}: any, props: Props) => {
			const userId = props.match.params[routes.URL_PARAM_USER];
			return {
				user: populate(firestore, `users/${userId}`, populates),
				users: firestore.data.users,
    authUser: firestore.data.users
                    && firestore.data.users[firebase.auth.uid],
			};
		},
	),
	withStyles(styles),
)(UsersFollowedPage);
