import {createStyles, Theme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {WithStyles} from '@material-ui/core/es';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, {ChangeEvent, FormEvent} from 'react';
import {firestoreConnect, withFirebase} from 'react-redux-firebase';
import {Link, NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import logo from '../images/logo_perfecttime.svg';
import isValid from '../utils/validation/validateSignIn';
import {connect} from "react-redux";
import {User} from "../types/user";


const styles = (theme: Theme) => createStyles({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    logo: {
        display: 'block',
        width: '25%',
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    errorMessage: {
        color: 'red',
    },
});

interface UserUpdatePasswordPageProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    firebase: any,
    firestore: any,
    auth: any,
}

interface State {
    email: string;
    passwordNew: string;
    passwordNewCheck: string;
    password: string;
    error: any;
    submitted: boolean;
    [key: string]: any;
}


const INITIAL_STATE: State = {
    email: '',
    passwordNew: '',
    passwordNewCheck: '',
    password: '',
    error: null,
    submitted: false,
};

class UserUpdatePasswordPage extends React.Component<UserDeletePageProps, State> {

    state = {
            email: this.props.auth.email ,
            passwordNew: INITIAL_STATE.passwordNew,
            passwordNewCheck: INITIAL_STATE.passwordNewCheck,
            password: INITIAL_STATE.password,
            error: INITIAL_STATE.error,
            submitted: INITIAL_STATE.submitted
    };

    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const {
            email,
            password,
        } = this.state;
        const {history, firebase} = this.props;

        const credentials = firebase.auth.EmailAuthProvider.credential(
              email,
              password
         );
        const userId = this.props.auth.uid;

        if(this.state.passwordNew === this.state.passwordNewCheck) {


            firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credentials)
                .catch((error: any) => {
                    alert("An error occurred. Please check your credentials")
                    this.setState({
                        error,
                    });
                })
                .then(() => {
                    firebase.auth().currentUser.updatePassword(this.state.passwordNew)
                        .catch(
                            function (error: any) {
                                console.log(error);
                                alert("An Error occurred while updating the password.");
                            })
                        .then(() => {
                            alert(`Password changed.`);
                            history.push(routes.USER_VIEW(userId));
                        })

                })
            ;
        }
        else {alert("The entered new passwords do not match. Please reenter them correctly.")}
        e.preventDefault();
    };

    handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const {classes} = this.props;
        const {
            email,
            password,
            error,
            submitted,
            passwordNew,
            passwordNewCheck
        } = this.state;


        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Link to={routes.LANDING}>
                            <img src={logo} className={classes.logo} alt='Logo'/>
                        </Link>

                        <Typography variant='h5'>Change Email-Address</Typography>
                        <Typography variant='h6'>Warning:</Typography>
                        <Typography variant='h6'>This changes the login mail-address.</Typography>

                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin='normal' required={true} fullWidth={true}>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <Input
                                    id='email-old'
                                    autoFocus={true}
                                    name='email-old'
                                    autoComplete='email-old'
                                    value={email}
                                    onChange={this.handleChangeInput}
                                />
                            </FormControl>

                            <FormControl margin='normal' required={true} fullWidth={true}>
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <Input
                                    name='password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={this.handleChangeInput}
                                />
                            </FormControl>
                            <FormControl margin='normal' required={true} fullWidth={true}>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <Input
                                    id='password-new'
                                    name='password-new'
                                    autoComplete='password-new'
                                    value={passwordNew}
                                    onChange={this.handleChangeInput}
                                />
                            </FormControl>
                            <FormControl margin='normal' required={true} fullWidth={true}>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <Input
                                    id='password-new-check'
                                    name='password-new-check'
                                    autoComplete='password-new-check'
                                    value={passwordNewCheck}
                                    onChange={this.handleChangeInput}
                                />
                            </FormControl>

                            {error && <p className={classes.errorMessage}>{error}</p>}

                            <Button
                                type='submit'
                                fullWidth={true}
                                id='signInButton'
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                                disabled={submitted || !isValid(email, password)}
                            >
                                Change Password
                            </Button>
                            <br/>
                            <NavLink exact={true} to={routes.USER_VIEW(this.props.auth.uid)}>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    fullWidth={true}
                                >
                                    Cancel
                                </Button>
                            </NavLink>
                        </form>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default compose(
    withFirebase,
    withStyles(styles),
    withRouter, firestoreConnect((props: UserUpdatePasswordPageProps) => {
        const userId = props.match.params[routes.URL_PARAM_USER];
        return [
            `users/${userId}`,
        ];
    }),
    connect(
        ({firestore: {data}}: any, props: UserUpdatePasswordPageProps) => {
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
)(UserUpdatePasswordPage);
