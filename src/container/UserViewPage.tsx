import React, {ChangeEvent, FormEvent} from 'react';
import {firestoreConnect, withFirebase} from 'react-redux-firebase';
import {Link, NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {User} from "../types/user";
import {Button, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import styles from "../styles/UserViewStyles";
import {parseDateToString} from "../utils/parser";
import {connect} from "react-redux";

interface UserViewPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    user: User,
}

interface State {
    user: User,
}

const INITIAL_USER: User = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        memberSince: Date.prototype,
        country: '',
        language: '',
    };


class UserViewPage extends React.Component<UserViewPageProps, State> {

    state = {
        user: this.props.user || INITIAL_USER,
    };

    componentDidUpdate(prevProps: UserViewPageProps, prevState: State) {
        const {user} = this.props;
        if (user !== prevProps.user) {
            this.setState({
                user,
            });
        }
    }

    render() {
        const {match, classes} = this.props;
        const {user} = this.state;
        const {username, firstName, lastName, email, memberSince, country, language} = user;
        const userId = match.params[routes.URL_PARAM_USER];

        return (

        <div className={classes.userViewPage}>
            <Typography
                variant='h4'
                gutterBottom={true}
            >
                User details of {username}
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
                <Paper className={classes.paperField}>
                    <Typography>Home Country:</Typography>
                    <Typography variant='h6'>{country}</Typography>
                </Paper>
                <br/>
                <Paper className={classes.paperField}>
                        <Typography>Member since:</Typography>
                        <Typography variant='h6'>{parseDateToString(memberSince)}</Typography>
                </Paper>

                <hr/>
                <NavLink exact={true} to={routes.USER_EDIT(userId)}>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth={true}
                    >
                        Edit Account
                    </Button>
                </NavLink>
            </div>
        </div>

        );


    }
}

export default compose(withRouter,
    firestoreConnect((props: UserViewPageProps) => {
        const userId = props.match.params[routes.URL_PARAM_USER];
        return [
            `User/${userId}`,
        ];
    }),
    connect(
        ({firestore: {data}}: any, props: UserViewPageProps) => {
            const userId = props.match.params[routes.URL_PARAM_USER];
            return {
                activity: data.users
                    && data.users[userId]
            };
        },
    ),
    withStyles(styles),
)(UserViewPage);