import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ActivityCard from './ActivityCard';
import {SliderNextArrow, SliderPrevArrow} from './SliderArrows';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import connect from 'react-redux/es/connect/connect';
import {compose} from 'redux';


const styles = theme => ({
	slider: {
		marginLeft: theme.spacing.unit * 4,
		marginRight: theme.spacing.unit * 4,
	},
	slideItem: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
	},
});

class ActivitiesSlider extends React.Component {

	render() {
		const {classes, activities} = this.props;

		const sliderSettings = {
			className: classes.slider,
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			prevArrow: <SliderPrevArrow/>,
			nextArrow: <SliderNextArrow/>,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			}, {
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			}],
		};

		return !isLoaded(activities)
			? 'Loading activities...'
			: isEmpty(activities)
				? 'No Activities created yet.'
				: <Slider {...sliderSettings}>
					{this.renderActivityCards()}
				</Slider>;
	}

	renderActivityCards = () => Object.keys(this.props.activities).map(key => (
		<div key={key} className={this.props.classes.slideItem}>
			<ActivityCard activity={this.props.activities[key]}/>
		</div>
	));
}

ActivitiesSlider.propTypes = {
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
			activities: data.TRIPS
				&& data.TRIPS[props.tripId]
				&& data.TRIPS[props.tripId].locations
				&& data.TRIPS[props.tripId].locations[props.locationId]
				&& data.TRIPS[props.tripId].locations[props.locationId].activities,
		}),
	),
	withStyles(styles),
)(ActivitiesSlider);