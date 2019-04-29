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
import {Stop, PersonAdd} from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
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
	icon: {
		margin: theme.spacing.unit * 2,
	},
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firestore: any;
	user: User;
	users: User[],
	auth: any,
}

class UsersFollowedPage extends React.Component<Props> {

	handleFollowUser = (userToFollow: any) => () => {
		const {users, auth} = this.props;
		const {firestore} = this.props;
		const currentUser = users[auth.uid];

		const firestoreRef = {
			collection: 'users',
			doc: auth.uid,
		};

		const following = [...currentUser.following];
		following.push(userToFollow);
		const userUpdated = {
			...currentUser,
			following,
		};

		firestore.set(firestoreRef, userUpdated);
	};
	handleUnfollowUser = (userToUnfollow: any) => () => {
		const {users, auth} = this.props;
		const {firestore} = this.props;
		const currentUser = users[auth.uid];

		const firestoreRef = {
			collection: 'users',
			doc: auth.uid,
		};

		const following = [...currentUser.following];
		following.splice(following.indexOf(userToUnfollow), 1);
		const userUpdated = {
			...currentUser,
			following,
		};

		firestore.set(firestoreRef, userUpdated);
	};

	render() {
		const {user, classes, users} = this.props;

		return (
			<div className={classes.root}>

				<Typography
					variant='h4'
					gutterBottom={true}
				>
					{user.username} follows:
				</Typography>

				{!(isLoaded(user) && isLoaded(users))
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
									const currentUser = users[this.props.auth.uid];
									return (
										<TableRow key={userId}>
											<TableCell component='th' scope='row'>
												{username}
												<Button
													onClick={this.handleFollowUser(userId)}
													disabled={!!currentUser && currentUser.following.includes(userId)}
													hidden={!!currentUser && currentUser.following.includes(userId)}
												>
													<PersonAdd className={classes.icon}/>
												</Button>
												<Button
													onClick={this.handleUnfollowUser(userId)}
													disabled={userId == this.props.auth.uid || !!currentUser.following.includes(userId)}
													hidden={userId == this.props.auth.uid || !!currentUser.following.includes(userId)}
												>
													<Stop className={classes.icon}/>
												</Button>
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

export default compose(
	withRouter,
	firestoreConnect((props: Props) => {
		const userId = props.match.params[routes.URL_PARAM_USER];
		return [{
			collection: 'users',
			doc: userId,
		}, {
			collection: 'users',
		}];
	}),
	connect(
		({firebase, firestore: {data}}: any, props: Props) => {
			const userId = props.match.params[routes.URL_PARAM_USER];
			return {
				user: data.users
					&& data.users[userId],
				users: data.users,
				auth: firebase.auth,
			};
		},
	),
	withStyles(styles),
)(UsersFollowedPage);
