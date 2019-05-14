import {Button, WithStyles, withStyles} from '@material-ui/core';
import {PersonAdd, PersonOutline} from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded, withFirebase} from 'react-redux-firebase';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import styles from '../styles/UserViewStyles';
import {User} from '../types/user';
import {spinnerWhileLoading} from '../utils/firebaseUtils';


interface FollowActionButtonProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
	userId: string,
	firestore: any,
	firebase: any,
	authUser: User,
	auth: any,
}

class FollowActionButton extends React.Component<FollowActionButtonProps> {

	handleFollowUser = (userToFollow: any) => () => {
		const {auth, authUser} = this.props;
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
		const {userId, classes, authUser} = this.props;

		return (
			<span>
				{!(isLoaded(authUser) || isLoaded(authUser.following))
					? '...' :
					<span hidden={!authUser || userId === this.props.auth.uid}>
						<span
							hidden={!!authUser.following && authUser.following.indexOf(userId) > -1}
						>
							<Button
								onClick={this.handleFollowUser(userId)}
								disabled={!authUser || userId === this.props.auth.uid
								|| (!!authUser.following && authUser.following.indexOf(userId) > -1)}
							>
								<PersonAdd className={classes.icon}/>
							</Button>
						</span>
						<span
							hidden={!!authUser.following && !(authUser.following.indexOf(userId) > -1)}
						>
							<Button
								onClick={this.handleUnfollowUser(userId)}
								disabled={!authUser || userId === this.props.auth.uid
								|| (!!authUser.following && !(authUser.following.indexOf(userId) > -1))}
							>
								<PersonOutline className={classes.icon}/>
							</Button>
						</span>
					</span>}
			</span>
		);
	}
}


export default compose(withRouter, withFirebase,
	connect(({firebase: {auth}}: any) => ({
		auth,
	})),
	spinnerWhileLoading(['auth']),
	firestoreConnect(() => {
		return [{
			collection: 'users',
		}];
	}),
	connect(
		({firebase, firestore: {data}}: any) => {
			return {
				authUser: data.users
					&& data.users[firebase.auth.uid],
			};
		},
	),

	withStyles(styles),
)(FollowActionButton);
