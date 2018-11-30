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
import {TRIP_ID} from '../constants/staticIds';
import logo from '../images/logo_perfecttime.svg';
import isValid from '../utils/validation/validateSignIn';


const styles = theme => ({
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
});

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
	submitted: false,
};

class SignIn extends React.Component {

	constructor(props) {
		super(props);
		this.state = {...INITIAL_STATE};
	}

	handleSubmit = e => {
		const {
			email,
			password,
		} = this.state;
		const {history, firebase} = this.props;

		const credentials = {
			email,
			password,
		};

		firebase.login(credentials)
			.then(() => {
				this.setState({...INITIAL_STATE});
				history.push(routes.LOCATIONS(TRIP_ID));
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
			email,
			password,
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

						<Typography variant="h5">Sign In</Typography>

						<form className={classes.form} onSubmit={this.handleSubmit}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">E-Mail</InputLabel>
								<Input id="email" autoFocus
									   name="email"
									   autoComplete="email"
									   value={email}
									   onChange={this.handleChangeInput}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Passwort</InputLabel>
								<Input
									name="password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={password}
									onChange={this.handleChangeInput}
								/>
							</FormControl>

							{error && <p className={classes.errorMessage}>{error.message}</p>}

							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								disabled={submitted || !isValid(email, password)}
							>
								Login
							</Button>
						</form>

						<p>
							Don't have an account?
							{' '}
							<Link to={routes.SIGN_UP}>Sign Up</Link>
						</p>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	firebase: PropTypes.shape({
		login: PropTypes.func.isRequired,
	}),
};

export default compose(
	withFirebase,
	withStyles(styles),
	withRouter,
)(SignIn);
