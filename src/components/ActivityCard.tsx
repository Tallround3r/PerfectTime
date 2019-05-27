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
import React from 'react';
import {NavLink} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {Activity} from '../types';
import {parseDateToString} from '../utils/parser';
// import {getRandomImage} from '../utils/RessourceUtils';


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
}

interface State {
	// cardImage: string,
}

class ActivityCard extends React.Component<Props, State> {

	state = {
		// cardImage: getRandomImage(),
	};

	handleDelete = () => {
		// TODO: implement delete Activity
	};

	render() {
		const {classes, activity, tripId, locationId} = this.props;
		const {title, description, startdate, enddate} = activity;

		return (
			<Card className={classes.card}>
				<CardHeader
					title={title}
					subheader={parseDateToString(startdate) + ' — ' + parseDateToString(enddate)}
				/>

				<CardMedia
					className={classes.media}
					// image={this.state.cardImage}
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
							onClick={this.handleDelete}
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
			</Card>
		);
	}
}

export default compose(
	withStyles(styles),
)(ActivityCard);
