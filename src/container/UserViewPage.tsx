import React from 'react';
import {firestoreConnect, isLoaded, withFirebase} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {User} from "../types/user";
import {Button, Paper, TableCell, Typography, withStyles, WithStyles} from "@material-ui/core";
import styles from "../styles/UserViewStyles";
import {parseDateToString} from "../utils/parser";
import {connect} from "react-redux";
import {PersonAdd, Stop} from "@material-ui/icons";

interface UserViewPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    user: User,
    users: User[],
    firestore: any,
    firebase: any,
    auth: any,
}

interface State {
    user: User,
    isOwnAccount: boolean
}

const INITIAL_USER: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    memberSince: new Date(),
    country: '',
    language: '',
    following: [],
};


class UserViewPage extends React.Component<UserViewPageProps, State> {

    state = {
        user: this.props.user || INITIAL_USER,
        isOwnAccount: false
    };

    componentDidUpdate(prevProps: UserViewPageProps, prevState: State) {
        const {user} = this.props;
        const {match} = this.props;
        const isOwnAccount = (match.params[routes.URL_PARAM_USER] == this.props.auth.uid);
        if (user !== prevProps.user) {
            this.setState({
                user,
                isOwnAccount,
            });
        }
    }

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
        const {users, match, classes} = this.props;
        const {user, isOwnAccount} = this.state;
        const {username, firstName, lastName, email, memberSince, country, language} = user;
        const userId = match.params[routes.URL_PARAM_USER];



        return (

            <div className={classes.userViewPage}>
                {console.log(users)}
                <Typography
                    variant='h4'
                    gutterBottom={true}
                    >
                    User details of {username}

                    {!(isLoaded(user) && isLoaded(users) && isLoaded(this.props.auth) && isLoaded(users[2])) // users may load only partially
                        ? '...'
                        : <span>
                            {console.log(users[this.props.firebase.auth().uid].following.includes(userId))}
                            <Button
                                    onClick={this.handleFollowUser(userId)}
                                    // disabled={!!this.state.isOwnAccount || users[this.props.firebase.auth().uid].following.includes(userId)}
                                    hidden={!!isOwnAccount || users[this.props.firebase.auth().uid].following.includes(userId)}
                                >
                                    <PersonAdd className={classes.icon}/>
                            </Button>
                                <Button
                                    onClick={this.handleUnfollowUser(userId)}
                                    // disabled={!!this.state.isOwnAccount || !users[this.props.auth.uid].following.includes(userId)}
                                    hidden={!!isOwnAccount || !users[this.props.auth.uid].following.includes(userId)}
                                >
                                    <Stop className={classes.icon}/>
                                </Button>
                        </span>
                    }

                </Typography>

                <div className={classes.inputContainer}>
                    <Paper className={classes.paperField}>
                        <Typography>User Name:</Typography>
                        <Typography variant='h6'>{username}</Typography>
                    </Paper>
                    <div className={classes.inputHorizontalContainer}>
                        <Paper className={classes.paperField}>
                            <Typography>First Name:</Typography>
                            <Typography variant='h6'>
                                {firstName}
                            </Typography>
                        </Paper>
                        <Paper className={classes.paperField}>
                            <Typography>Last Name:</Typography>
                            <Typography variant='h6'>{lastName}</Typography>
                        </Paper>
                    </div>
                    <br/>
                    <Paper className={classes.paperField}>
                        <Typography>Mail:</Typography>
                        <Typography variant='h6'>{email}</Typography>
                    </Paper>
                    <Paper className={classes.paperField} hidden={!country}>
                        <Typography>Home Country:</Typography>
                        <Typography variant='h6'>{country}</Typography>
                    </Paper>
                    <Paper className={classes.paperField} hidden={!language}>
                        <Typography>Language:</Typography>
                        <Typography variant='h6'>{language}</Typography>
                    </Paper>
                    <br/>
                    <Paper className={classes.paperField}>
                        <Typography>Member since:</Typography>
                        <Typography variant='h6'>{parseDateToString(memberSince)}</Typography>
                    </Paper>
                    <hr/>
                    <NavLink exact={true} to={routes.USER_EDIT(userId)} hidden={!this.state.isOwnAccount}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth={true}
                        >
                            Edit Account
                        </Button>
                    </NavLink>
                </div>
                <hr/>
                <NavLink exact={true} to={routes.USER_FOLLOWS(userId)}>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth={true}
                    >
                        See the people {username} is following.
                    </Button>
                </NavLink>

            </div>

        );


    }
}

export default compose(withRouter, withFirebase,
    firestoreConnect((props: UserViewPageProps) => {
        const userId = props.match.params[routes.URL_PARAM_USER];
        return [{
            collection: 'users',
            doc: userId,
        }, {
            collection: 'users',
        }];
    }),
    connect(
        ({firebase, firestore: {data}}: any, props: UserViewPageProps) => {
            const userId = props.match.params[routes.URL_PARAM_USER];
            return {
                user: data.users
                    && data.users[userId],
                users: data.users,
                auth: firebase.auth,
            };
        },
    ),
    connect(({firebase: {auth}}: any) => ({
        auth,
    })),
    withStyles(styles),
)(UserViewPage);
