import React, {ChangeEvent, FormEvent, MouseEvent} from 'react';
import {firestoreConnect, withFirebase} from 'react-redux-firebase';
import {Link, NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {User} from "../types/user";
import {Button, Paper, TextField, Typography, withStyles, WithStyles} from "@material-ui/core";
import styles from "../styles/UserEditStyles";
import {parseDateToString} from "../utils/parser";
import {connect} from "react-redux";

interface UserEditPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    user: User,
    firestore: any,
    auth: any,
}

interface State {
    user: User,
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


class UserEditPage extends React.Component<UserEditPageProps, State> {

    state = {
        user: this.props.user || INITIAL_USER,
    };

    componentDidUpdate(prevProps: UserEditPageProps, prevState: State) {
        const {user} = this.props;
        if (user !== prevProps.user) {
            this.setState({
                user,
            });
        }
    }

    componentDidMount(): void {
        const {match} = this.props;
        if(match.params[routes.URL_PARAM_USER] != this.props.auth.uid)
        {
            this.navigateBack();
        }
    }

    navigateBack = () => {
        const {history, match} = this.props;
        const userId = match.params[routes.URL_PARAM_USER];

        history.push(routes.USER_VIEW(userId));
    };

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const {firestore, match} = this.props;
        const {user} = this.state;

        const firestoreRef = {
            collection: 'users',
            doc: match.params[routes.URL_PARAM_USER],
        };
        firestore.set(firestoreRef, user);

        this.navigateBack();

        e.preventDefault();
    };

    handleCancel = (e: MouseEvent) => {
        const {user} = this.props;

        this.setState({
            user,
        });

        this.navigateBack();

        e.preventDefault();
    };

    handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value,
                },
            };
        });
    };



    render() {
        const {match, classes} = this.props;
        const {user} = this.state;
        const {username, firstName, lastName, email, memberSince, country, language} = user;
        const userId = match.params[routes.URL_PARAM_USER];

        return (

        <div className={classes.userEditPage}>
            <Typography
                variant='h4'
                gutterBottom={true}
            >
                Edit Account of {username}
            </Typography>
            <form className = {classes.inputContainer} onSubmit={this.handleSubmit}>
                <hr/>
                <Typography
                    variant='h5'
                    gutterBottom={true}
                >
                    Changeable Account Information
                </Typography>
                <TextField
                    className={classes.inputField}
                    label='Username'
                    name='username'
                    value={username}
                    onChange={this.handleChangeInput}
                    required={true}
                />
                <TextField
                    className={classes.inputField}
                    label='First Name'
                    name='firstName'
                    value={firstName}
                    onChange={this.handleChangeInput}
                    required={true}
                />
                <TextField
                    className={classes.inputField}
                    label='Last Name'
                    name='lastName'
                    value={lastName}
                    onChange={this.handleChangeInput}
                    required={true}
                />
                <TextField
                    className={classes.inputField}
                    label='Home Country'
                    name='country'
                    value={country}
                    onChange={this.handleChangeInput}
                    required={false}
                />
                <TextField
                    className={classes.inputField}
                    label='Language'
                    name='language'
                    value={language}
                    onChange={this.handleChangeInput}
                    required={false}
                />
                <cite>
                    The language setting will not change the application setting. This feature is still to be developed.
                </cite>
                <br/>
                <div className={classes.actionButtonsContainer}>
                    <Button
                        className={classes.actionButton}
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth={true}
                    >
                        Save Changes
                    </Button>
                    <Button
                        className={classes.actionButton}
                        variant='contained'
                        color='secondary'
                        fullWidth={true}
                        onClick={this.handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
            <hr/>
            <div className={classes.inputContainer}>
                <Typography
                variant='h5'
                gutterBottom={true}
                >
                Fixed Account Information
                </Typography>
                <Paper className={classes.paperField}>
                        <Typography>Mail:</Typography>
                        <Typography variant='h6'>{email}</Typography>
                </Paper>
                <Paper className={classes.paperField}>
                        <Typography>Member since:</Typography>
                        <Typography variant='h6'>{parseDateToString(memberSince)}</Typography>
                </Paper>
                <div className={classes.actionButtonsContainer}>
                <NavLink exact={true} to={routes.USER_CHANGE_EMAIL(userId)}>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth={false}
                    >
                        Change Email
                    </Button>
                </NavLink>
                <NavLink exact={true} to={routes.USER_CHANGE_PASSWORD(userId)}>
                        <Button
                            color='primary'
                            variant='contained'
                            fullWidth={false}
                        >
                            Change Password
                        </Button>
                </NavLink>
                <NavLink exact={true} to={routes.USER_DELETE_ACCOUNT(userId)}>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth={false}
                    >
                        Delete Account
                    </Button>
                </NavLink>
                </div>
                <hr/>
            </div>

            </div>


        );


    }
}

export default compose(withRouter,
    firestoreConnect((props: UserEditPageProps) => {
        const userId = props.match.params[routes.URL_PARAM_USER];
        return [
            `users/${userId}`,
        ];
    }),
    connect(
        ({firestore: {data}}: any, props: UserEditPageProps) => {
            const userId = props.match.params[routes.URL_PARAM_USER];
            return {
                user: data.users
                    && data.users[userId]
            };
        },
    ),connect (({firebase: {auth}}: any) => ({
        auth,
    })),
    withStyles(styles),
)(UserEditPage);