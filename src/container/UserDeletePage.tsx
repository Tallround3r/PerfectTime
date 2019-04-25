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
import {withFirebase} from 'react-redux-firebase';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import logo from '../images/logo_perfecttime.svg';
import isValid from '../utils/validation/validateSignIn';


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

interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {
	firebase: any,
}

interface State {
	email: string;
	password: string;
	error: any;
	submitted: boolean;

	[key: string]: any;
}


const INITIAL_STATE: State = {
	email: '',
	password: '',
	error: null,
	submitted: false,
};

class UserDeletePage extends React.Component<Props, State> {

	state = {...INITIAL_STATE};

	handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
				history.push(routes.TRIPS());
			})
			.catch((error: any) => {
				this.setState({
					error,
				});
			});

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
		} = this.state;

		return (
			<React.Fragment>
				<CssBaseline/>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Link to={routes.LANDING}>
							<img src={logo} className={classes.logo} alt='Logo'/>
						</Link>

						<Typography variant='h5'>Sign In</Typography>

						<form className={classes.form} onSubmit={this.handleSubmit}>
							<FormControl margin='normal' required={true} fullWidth={true}>
								<InputLabel htmlFor='email'>Email</InputLabel>
								<Input
									id='email'
									autoFocus={true}
									name='email'
									autoComplete='email'
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
								Login
							</Button>
						</form>

						<p>
							Don't have an account?
							{' '}
							<Link to={routes.SIGN_UP} id={'signIn'}>Sign Up</Link>
						</p>
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

export default compose(
	withFirebase,
	withStyles(styles),
	withRouter,
)(UserDeletePage);
