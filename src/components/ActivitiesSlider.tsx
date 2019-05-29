import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isEmpty, isLoaded} from 'react-redux-firebase';
import Slider from 'react-slick';
import {compose} from 'redux';
import {Activity} from '../types';
import ActivityCard from './ActivityCard';
import {SliderNextArrow, SliderPrevArrow} from './SliderArrows';


const styles = (theme: Theme) => createStyles({
	slider: {
		marginLeft: theme.spacing.unit * 4,
		marginRight: theme.spacing.unit * 4,
	},
	slideItem: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
	},
});

interface Props extends WithStyles<typeof styles> {
	firestore: any;
	tripId: string;
	locationId: string;
	activities: { [key: string]: Activity }
}

class ActivitiesSlider extends React.Component<Props> {

	componentDidMount() {
		const {firestore, tripId, locationId} = this.props;

		const firestoreRef = {
			collection: 'TRIPS',
			doc: tripId,
			subcollections: [{
				collection: 'locations',
				doc: locationId,
				subcollections: [{
					collection: 'activities',
				}],
			}],
		};
		firestore.get(firestoreRef);
	}

	render() {
		const {classes, activities} = this.props;
		console.log(activities);
		const sliderSettings = {
			className: classes.slider,
			dots: true,
			infinite: false,
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

	renderActivityCards = () => Object.keys(this.props.activities).map((key) => {
		const {classes, activities, tripId, locationId} = this.props;
		return (
			<div key={`slider-child-${key}`} className={classes.slideItem}>
				<ActivityCard activity={activities[key]} activityId={key} tripId={tripId} locationId={locationId}/>
			</div>
		);
	});
}

export default compose(
	firestoreConnect(),
	connect(
		({firestore: {data}}: any, props: Props) => ({
			activities: data.TRIPS
				&& data.TRIPS[props.tripId]
				&& data.TRIPS[props.tripId].locations
				&& data.TRIPS[props.tripId].locations[props.locationId]
				&& data.TRIPS[props.tripId].locations[props.locationId].activities,
		}),
	),
	withStyles(styles),
)(ActivitiesSlider);
