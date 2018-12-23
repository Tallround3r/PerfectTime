import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {AUTH_CONDITION_WITH_DRAWER} from '../constants/auth-conditions';
import {URL_PARAM_TRIP} from '../constants/routes';
import * as routes from '../constants/routes';
import logo from '../images/logo_perfecttime.svg';
import {menuItems} from './MenuItems';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import withAuthorization from './withAuthorization';


const withDrawer = (Component) => {

	const drawerWidth = 240;
	const swipeDrawerWidth = 200;
	const styles = theme => ({
		root: {
			display: 'flex',
		},
		toolbar: {
			paddingRight: 24, // keep right padding when drawer closed
		},
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarSpacer: theme.mixins.toolbar,
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down('sm')]: {
				marginLeft: swipeDrawerWidth,
				width: `calc(100% - ${swipeDrawerWidth}px)`,
			},
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginLeft: 12,
			marginRight: 36,
		},
		menuButtonHidden: {
			display: 'none',
		},
		title: {
			flexGrow: 1,
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing.unit * 9,
		},
		swipeDrawerPaper: {
			width: swipeDrawerWidth,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
			paddingTop: theme.spacing.unit,
			height: '100vh',
			overflow: 'auto',
		},
		logo: {
			display: 'block',
			width: '50%',
			margin: 'auto',
			marginBottom: '20px',
		},
	});

	class AppWrapper extends React.Component {
		state = {
			open: false,
		};

		handleDrawerOpen = () => {
			this.setState({open: true});
		};

		handleDrawerClose = () => {
			this.setState({open: false});
		};

		render() {
			const {classes, auth, match} = this.props;
			const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
			const tripId = match.params[URL_PARAM_TRIP];

			const drawerContent = <div>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={this.handleDrawerClose}>
						<ChevronLeftIcon/>
					</IconButton>
				</div>

				{this.state.open &&
				<div>
					<NavLink exact to={routes.LANDING}>
						<img src={logo} className={classes.logo} alt="Logo"/>
					</NavLink>

					<Typography
						variant="h5"
						color="inherit"
						className={classes.title}
						align="center"
					>
						My Trip
					</Typography>
				</div>
				}

				<Divider/>

				<List>{menuItems(tripId)}</List>
			</div>;

			return (
				<React.Fragment>
					<CssBaseline/>
					<div className={classes.root}>
						<AppBar
							position="absolute"
							className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
						>
							<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
								<IconButton
									color="inherit"
									aria-label="Open drawer"
									onClick={tripId && this.handleDrawerOpen}
									className={classNames(
										classes.menuButton,
										this.state.open && classes.menuButtonHidden,
									)}
								>
									<MenuIcon/>
								</IconButton>
								<Typography
									component="h1"
									variant="h6"
									color="inherit"
									noWrap
									className={classes.title}
								>
									Perfect Time — Plan Your Trip
								</Typography>

								{isEmpty(auth) ? <SignInButton/> : <SignOutButton/>}
							</Toolbar>
						</AppBar>

						{tripId &&
						<Hidden smDown>
							<Drawer
								className={classes.drawer}
								variant="permanent"
								classes={{
									paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
								}}
								open={this.state.open}
							>
								{drawerContent}
							</Drawer>
						</Hidden>}

						{tripId &&
						<Hidden mdUp>
							<SwipeableDrawer
								onClose={this.handleDrawerClose}
								onOpen={this.handleDrawerOpen}
								open={this.state.open}
								disableBackdropTransition={!iOS}
								disableDiscovery={iOS}
							>
								{drawerContent}
							</SwipeableDrawer>
						</Hidden>}

						<div className={classes.content}>
							<div className={classes.appBarSpacer}/>
							<Component/>
						</div>

					</div>
				</React.Fragment>
			);
		}
	}

	AppWrapper.propTypes = {
		classes: PropTypes.object.isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				[URL_PARAM_TRIP]: PropTypes.string,
			}),
		}).isRequired,
		auth: PropTypes.object,
	};

	return compose(
		withAuthorization(AUTH_CONDITION_WITH_DRAWER),
		withRouter,
		firestoreConnect(),
		connect(
			({firebase: {auth}}) => ({
				auth,
			}),
		),
		withStyles(styles),
	)(AppWrapper);
};

export default withDrawer;
