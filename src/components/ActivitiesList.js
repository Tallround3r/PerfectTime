import React from 'react';
import {compose} from 'redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import * as routes from '../constants/routes';
import Slider from 'react-slick';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import Button from '@material-ui/core/es/Button/Button';
import PictureStar from '../images/star.jpg';


const styles = theme => ({
	gridList: {
		flexWrap: 'nowrap',
		textAlign: 'center',
		backgroundColor: theme.palette.background.paper,
	},
});

class ActivitiesList extends React.Component {

	render() {
		const {classes} = this.props;
		const {activities} = this.props;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		};

		return (
			<div style={{textAlign: 'center'}}>
				<Slider {...settings}>
					{!isLoaded(activities)
						? <Typography>Loading activities...</Typography>
						: isEmpty(activities)
							? <Typography>No Activities created yet.</Typography>
							: Object.keys(activities).map(key =>
								<div style={{textAlign: 'center'}}>
									<GridList cols={5} cellHeight='auto'>
										<GridListTile>
											<Card>
												<CardActionArea href={routes.ACTIVITY_EDIT}>
													<CardMedia
														component="img"
														alt="Star"
														height="auto"
														image={PictureStar}
														title="Stern"
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="h2">
															This is a star.
														</Typography>
														<Typography component="p">
															Twinkle, twinkle, little star,<br/>
															How I wonder what you are.<br/>
															Up above the world so high,<br/>
															Like a diamond in the sky.<br/>
														</Typography>
													</CardContent>
												</CardActionArea>
												<CardActions>
													<Button
														size="small"
														color="blue"
														href={routes.ACTIVITY_EDIT}>Edit Activity
													</Button>
												</CardActions>
											</Card>
										</GridListTile>
										<GridListTile>
											<Card>
												<CardActionArea href={routes.ACTIVITY_EDIT}>
													<CardMedia
														component="img"
														alt="Star"
														height="auto"
														image={PictureStar}
														title="Stern"
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="h2">
															This is a star.
														</Typography>
														<Typography component="p">
															Twinkle, twinkle, little star,<br/>
															How I wonder what you are.<br/>
															Up above the world so high,<br/>
															Like a diamond in the sky.<br/>
														</Typography>
													</CardContent>
												</CardActionArea>
												<CardActions>
													<Button
														size="small"
														color="blue"
														href={routes.ACTIVITY_EDIT}>Edit Activity
													</Button>
												</CardActions>
											</Card>
										</GridListTile>
										<GridListTile>
											<Card>
												<CardActionArea href={routes.ACTIVITY_EDIT}>
													<CardMedia
														component="img"
														alt="Star"
														height="auto"
														image={PictureStar}
														title="Stern"
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="h2">
															This is a star.
														</Typography>
														<Typography component="p">
															Twinkle, twinkle, little star,<br/>
															How I wonder what you are.<br/>
															Up above the world so high,<br/>
															Like a diamond in the sky.<br/>
														</Typography>
													</CardContent>
												</CardActionArea>
												<CardActions>
													<Button
														size="small"
														color="blue"
														href={routes.ACTIVITY_EDIT}
													>
														Edit Activity
													</Button>
												</CardActions>
											</Card>
										</GridListTile>
									</GridList>
									<Typography>
										Description: {activities[key].description}
									</Typography>
								</div>,
							)}
				</Slider>
			</div>
		);
	}

}

ActivitiesList.propTypes = {
	classes: PropTypes.object.isRequired,
	tripId: PropTypes.string.isRequired,
	locationId: PropTypes.string.isRequired,
	activities: PropTypes.object,
};

export default compose(
	firestoreConnect((props) => [
		`TRIPS/${props.tripId}/locations/${props.locationId}/activities`,
	]),
	connect(
		({firestore: {data}}, props) => ({
			activities: data.TRIPS && data.TRIPS[props.tripId] && data.TRIPS[props.tripId].locations
				&& data.TRIPS[props.tripId].locations[props.locationId]
				&& data.TRIPS[props.tripId].locations[props.locationId].activities,
		}),
	),
	withStyles(styles),
)(ActivitiesList);
