import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Tooltip,
	Typography,
	withStyles,
} from '@material-ui/core';
import {Delete, Edit, OpenInNew} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {URL_PARAM_LOCATION, URL_PARAM_TRIP} from '../constants/routes';
import {Activity} from '../models';
import {parseDateToString} from '../utils/parser';
import {getRandomImage} from '../utils/RessourceUtils';


const styles = theme => ({
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

class ActivityCard extends React.Component {

	cardImage = getRandomImage();

	handleDelete = () => {
	};

	render() {
		const {classes, activity, match} = this.props;
		const {title, description, startdate, enddate} = activity;
		const tripId = match.params[URL_PARAM_TRIP];
		const locationId = match.params[URL_PARAM_LOCATION];

		return (
			<Card className={classes.card}>
				<CardHeader
					title={title}
					subheader={parseDateToString(startdate) + ' — ' + parseDateToString(enddate)}
				/>

				<CardMedia
					className={classes.media}
					image={this.cardImage}
					title={title}
				/>

				<CardContent>
					<Typography component="p">
						{description}
					</Typography>
				</CardContent>
				<CardActions className={classes.actions}>
					<Tooltip title="Delete" aria-label="Delete">
						<IconButton
							onClick={this.handleDelete}
						>
							<Delete/>
						</IconButton>
					</Tooltip>
					<Tooltip title="Edit" aria-label="Edit">
						<NavLink exact to={routes.ACTIVITY_EDIT(tripId, locationId, this.props.activityId)}>
							<IconButton>
								<Edit/>
							</IconButton>
						</NavLink>
					</Tooltip>
					<Tooltip title="Open" aria-label="Open">
						<NavLink exact to={routes.ACTIVITY_VIEW(tripId, locationId, this.props.activityId)}>
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

ActivityCard.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.objectOf(Activity).isRequired,
	activityId: PropTypes.string.isRequired,
};

export default compose(
	withRouter,
	withStyles(styles),
)(ActivityCard);