import React from 'react';
import {firestoreConnect, withFirebase} from 'react-redux-firebase';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {User} from "../types/user";
import {Button, Paper, Typography, withStyles, WithStyles} from "@material-ui/core";
import styles from "../styles/UserViewStyles";
import {parseDateToString} from "../utils/parser";
import {connect} from "react-redux";

interface UserViewPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    user: User,
    firebase: any,
    auth: any,
}

interface State {
    user: User,
    isOwnAccount : boolean
}

const INITIAL_USER: User = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        memberSince: new Date(),
        country: '',
        language: '',
    };


class UserViewPage extends React.Component<UserViewPageProps, State> {

    state = {
        user: this.props.user || INITIAL_USER,
        isOwnAccount : false
    };

    componentDidUpdate(prevProps: UserViewPageProps, prevState: State) {
        const {user} = this.props;
        const {match} = this.props;
        this.state.isOwnAccount = (match.params[routes.URL_PARAM_USER] == this.props.auth.uid);
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
        this.state.isOwnAccount = (userId == this.props.auth.uid);

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
                <Paper className={classes.paperField} hidden={! country}>
                    <Typography>Home Country:</Typography>
                    <Typography variant='h6'>{country}</Typography>
                </Paper>
                <Paper className={classes.paperField} hidden={! language}>
                    <Typography>Language:</Typography>
                    <Typography variant='h6'>{language}</Typography>
                </Paper>
                <br/>
                <Paper className={classes.paperField}>
                        <Typography>Member since:</Typography>
                        <Typography variant='h6'>{parseDateToString(memberSince)}</Typography>
                </Paper>
                {console.log(this.state)}
                {console.log(this.props)}
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
        </div>

        );


    }
}

export default compose(withRouter, withFirebase, firestoreConnect((props: UserViewPageProps) => {
        const userId = props.match.params[routes.URL_PARAM_USER];
        return [
            `users/${userId}`,
        ];
    }),
    connect(
        ({firestore: {data}}: any, props: UserViewPageProps) => {
            const userId = props.match.params[routes.URL_PARAM_USER];
            return {
                user: data.users
                    && data.users[userId]
            };
        },
    ),
    connect (({firebase: {auth}}: any) => ({
        auth,
    })),
    withStyles(styles),
)(UserViewPage);