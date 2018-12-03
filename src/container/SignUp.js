import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {withFirebase} from 'react-redux-firebase';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import logo from '../images/logo_perfecttime.svg';
import isValid from '../utils/validation/validateSignUp';


const styles = theme => ({
	layout: {
		width: 'auto',
		display: 'block', // Fix IE11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(450 + theme.spacing.unit * 3 * 2)]: {
			width: 450,
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
	realNameForms: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	firstNameForm: {
		marginRight: theme.spacing.unit * 2,
	},
});

const INITIAL_STATE = {
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	error: null,
	submitted: false,
};

class SignUp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {...INITIAL_STATE};
	}

	handleSubmit = e => {
		const {
			username,
			email,
			password,
			firstName,
			lastName,
		} = this.state;
		const {history, firebase} = this.props;

		const credentials = {
			email: email,
			password: password,
			signIn: 'true',
		};
		const profile = {
			username,
			email,
			firstName,
			lastName,
			memberSince: new Date(),
		};

		firebase.createUser(credentials, profile)
			.then(() => {
				this.setState({...INITIAL_STATE});
				history.push(routes.SIGN_IN);
			})
			.catch(error => {
				this.setState({
					error,
				});
			});

		e.preventDefault();
	};

	handleChangeInput = e => {
		const {name, value} = e.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const {classes} = this.props;
		const {
			username,
			firstName,
			lastName,
			email,
			password,
			passwordConfirm,
			error,
			submitted,
		} = this.state;

		return (
			<React.Fragment>
				<CssBaseline/>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Link to={routes.LANDING}>
							<img src={logo} className={classes.logo} alt="Logo"/>
						</Link>

						<Typography variant="h5">Create Account</Typography>

						<form className={classes.form} onSubmit={this.handleSubmit}>
							<div className={classes.realNameForms}>
								<FormControl className={classes.firstNameForm} margin="normal" required fullWidth>
									<InputLabel htmlFor="firstName">First Name</InputLabel>
									<Input id="firstName" autoFocus
										   name="firstName"
										   value={firstName}
										   onChange={this.handleChangeInput}
									/>
								</FormControl>
								<FormControl margin="normal" required fullWidth>
									<InputLabel htmlFor="lastName">Last Name</InputLabel>
									<Input id="lastName"
										   name="lastName"
										   value={lastName}
										   onChange={this.handleChangeInput}
									/>
								</FormControl>
							</div>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="username">Username</InputLabel>
								<Input id="username"
									   name="username"
									   autoComplete="username"
									   value={username}
									   onChange={this.handleChangeInput}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">E-Mail</InputLabel>
								<Input id="email"
									   name="email"
									   autoComplete="email"
									   value={email}
									   onChange={this.handleChangeInput}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Passwort</InputLabel>
								<Input id="password"
									   name="password"
									   type="password"
									   autoComplete="current-password"
									   value={password}
									   onChange={this.handleChangeInput}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="passwordConfirm">Passwort wiederholen</InputLabel>
								<Input id="passwordConfirm"
									   name="passwordConfirm"
									   type="password"
									   value={passwordConfirm}
									   onChange={this.handleChangeInput}
								/>
							</FormControl>

							{error && <p className={classes.errorMessage}>{error.message}</p>}

							<Button type="submit" fullWidth
									variant="contained"
									id="signUpButton"
									color="primary"
									className={classes.submit}
									disabled={submitted || !isValid(username, email, password, passwordConfirm, firstName, lastName)}
							>
								Sign Up
							</Button>
						</form>

						<p>
							Already have an account?
							{' '}
							<Link to={routes.SIGN_IN}>Sign In</Link>
						</p>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
	firebase: PropTypes.shape({
		createUser: PropTypes.func.isRequired,
	}),
	auth: PropTypes.object,
};

export default compose(
	withFirebase,
	withStyles(styles),
	withRouter,
)(SignUp);
