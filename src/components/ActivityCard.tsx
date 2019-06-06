import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	IconButton,
	Theme,
	Tooltip,
	Typography,
	WithStyles,
	withStyles,
} from '@material-ui/core';
import {Delete, Edit, OpenInNew} from '@material-ui/icons';
import React, {MouseEvent} from 'react';
import {NavLink, RouteComponentProps} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {getStorageURL} from '../firebase/storage';
import defaultImage from '../images/default-activity.jpg';
import loadingImage from '../images/loading.gif';
import {Activity} from '../types';
import {parseDateToString} from '../utils/parser';
import ConfirmDialog from './ConfirmDialog';


const styles = (theme: Theme) => createStyles({
	card: {
		maxWidth: 400,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
		flexDirection: 'row-reverse',
	},
});

interface Props extends WithStyles<typeof styles> {
	tripId: string;
	locationId: string;
	activityId: string;
	activity: Activity;
	firestore: any;
}

interface State {
	isLoading: boolean;
	imageSrc: any;
	openDeleteDialog: boolean,
}

class ActivityCard extends React.Component<Props, State> {

	state = {
		isLoading: false,
		imageSrc: loadingImage,
		openDeleteDialog: false,
	};

	componentWillMount(): void {
		const {activityId} = this.props;
		const path = `images/activities/${activityId}`;

		this.setState({isLoading: true});

		getStorageURL(path)
			.then((url) => {
				this.setState({imageSrc: url});
			})
			.catch(() => {
				this.setState({imageSrc: defaultImage});
			})
			.finally(() => {
				this.setState({isLoading: false});
			});
	}

	handleDeleteBtnClicked = () => (e: MouseEvent) => {
		e.preventDefault();
		console.log('delete clicked');
		this.setState({
			openDeleteDialog: true,
		});
	};

	handleDeleteActivity = () => (e: MouseEvent) => {
		e.preventDefault();
		const {firestore, tripId, locationId, activityId} = this.props;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
				subcollections: [{
					collection: 'activities',
					doc: activityId,
				}],
			}],
		};
		firestore.delete(firestoreRef).then(() => {
			this.setState({
				openDeleteDialog: false,
			});
		}).catch(() => {
			alert('Missing permission to delete this Activity! \n Maybe you are not a member or owner of the Trip.');
		});
		// TODO: implement delete Activity
	};

	handleCancelDeleteActivity = () => (e: MouseEvent) => {
		this.setState({
			openDeleteDialog: false,
		});
	};

	render() {
		const {classes, activity, tripId, locationId} = this.props;
		const {imageSrc} = this.state;
		const {title, description, startdate, enddate} = activity;

		return (
			<Card className={classes.card}>
				<CardHeader
					title={title}
					subheader={parseDateToString(startdate) + ' — ' + parseDateToString(enddate)}
				/>

				<CardMedia
					className={classes.media}
					image={imageSrc}
					title={title}
				/>

				<CardContent>
					<Typography component='p'>
						{description}
					</Typography>
				</CardContent>
				<CardActions className={classes.actions}>
					<Tooltip title='Delete' aria-label='Delete'>
						<IconButton
							onClick={this.handleDeleteBtnClicked()}
						>
							<Delete/>
						</IconButton>
					</Tooltip>
					<Tooltip title='Edit' aria-label='Edit'>
						<NavLink exact={true} to={routes.ACTIVITY_EDIT(tripId, locationId, this.props.activityId)}>
							<IconButton>
								<Edit/>
							</IconButton>
						</NavLink>
					</Tooltip>
					<Tooltip title='Open' aria-label='Open'>
						<NavLink exact={true} to={routes.ACTIVITY_VIEW(tripId, locationId, this.props.activityId)}>
							<IconButton>
								<OpenInNew/>
							</IconButton>
						</NavLink>
					</Tooltip>
				</CardActions>

				<ConfirmDialog
					content={'Are you sure you want to delete this activity ?\n' +
					'This action can not be undone.'}
					open={this.state.openDeleteDialog}
					onConfirm={this.handleDeleteActivity()}
					onCancel={this.handleCancelDeleteActivity()}
				/>

			</Card>
		);
	}
}

export default compose(
	withStyles(styles),
)(ActivityCard);
