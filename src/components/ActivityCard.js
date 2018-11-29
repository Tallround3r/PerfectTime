import {Card, CardActions, CardContent, CardHeader, CardMedia, withStyles, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Typography from '@material-ui/core/es/Typography/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {Activity} from '../models';

class ActivityCard extends React.Component {

	render() {
		const {activity} = this.props;

		return (
			<Card>
				<CardHeader
					title={activity.title}
					subheader={activity.startDate + ' - ' + activity.endDate}
				/>
				<CardMedia
					image="../images/sample_activity_img.jpg"
					title={`Image of ${activity.title}`}
				/>
				<CardContent>
					<Typography
						component="p"
					>
						{activity.description}
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton>
						<Delete/>
					</IconButton>
				</CardActions>
			</Card>
		);
	}
}

ActivityCard.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.instanceOf(Activity).isRequired,
};

export default compose(
	withStyles(styles),
)(ActivityCard);