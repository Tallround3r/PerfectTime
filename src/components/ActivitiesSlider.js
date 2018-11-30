import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ActivityCard from './ActivityCard';
import {SliderNextArrow, SliderPrevArrow} from './SliderArrows';


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
		const {classes} = this.props;

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

		return (
			<Slider {...sliderSettings}>
				{this.renderActivityCards()}
			</Slider>
		);
	}

	renderActivityCards = () => Object.keys(this.props.activities).map(key => (
		<div key={key} className={this.props.classes.slideItem}>
			<ActivityCard activity={this.props.activities[key]}/>
		</div>
	));
}

ActivitiesSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	activities: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivitiesSlider);