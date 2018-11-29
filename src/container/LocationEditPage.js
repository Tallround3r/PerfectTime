import {Button, Paper, TextField, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/es/Typography/Typography';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import DatePicker from 'material-ui-pickers/DatePicker';
import PropTypes from 'prop-types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import Slider from 'react-slick';
import {compose} from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {SliderNextArrow, SliderPrevArrow} from '../components/SliderArrows';
import * as routes from '../constants/routes';
import {Location} from '../models';


const styles = theme => ({
	locationEditPage: {
		paddingTop: theme.spacing.unit * 3,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 10,
		minWidth: '23em',
	},
	inputField: {
		margin: theme.spacing.unit,
	},
	imagePaper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing.unit,
		float: 'right',
		width: '18em',
		height: '18em',
	},
	imageIcon: {
		fontSize: '10em',
	},
	actionButtonsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: theme.spacing.unit * 3,
	},
	actionButton: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	activitiesContainer: {
		marginTop: theme.spacing.unit * 8,
	},
	activitiesSlider: {
		marginLeft: theme.spacing.unit * 4,
		marginRight: theme.spacing.unit * 4,
	},
});


class LocationEditPage extends React.Component {

	state = {
		location: new Location(),
	};

	handleSubmit = (e) => {


		e.preventDefault();
	};

	handleChangeInput = (e) => {
		const {name, value} = e.target;

		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					[name]: value,
				},
			};
		});
	};

	handleChangeDate = (date) => {
		this.setState((prevState) => {
			return {
				location: {
					...prevState.location,
					date,
				},
			};
		});
	};

	render() {
		const {classes} = this.props;
		const {title, description, date, address} = this.state.location;

		const sliderSettings = {
			className: classes.activitiesSlider,
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
			<div className={classes.locationEditPage}>
				<Typography
					variant="h3"
					gutterBottom={true}
				>
					Edit Location
				</Typography>

				<div>
					<NavLink exact to={routes.LOCATIONS_EDIT}>
						<Paper
							className={classes.imagePaper}
						>
							<AddPhotoAlternateOutlined
								className={classes.imageIcon}
							/>
						</Paper>
					</NavLink>

					<form className={classes.inputContainer} onSubmit={this.handleSubmit}>
						<TextField
							className={classes.inputField}
							label="Title"
							name="title"
							value={title}
							onChange={this.handleChangeInput}
						/>
						<TextField
							className={classes.inputField}
							label="Description"
							name="description"
							value={description}
							onChange={this.handleChangeInput}
							multiline
						/>
						<DatePicker
							className={classes.inputField}
							keyboard
							required
							value={date}
							onChange={this.handleChangeDate}
							label="Date"
							format="MM/dd/yyyy"
							placeholder="MM/DD/YYYY"
							mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
							disableOpenOnEnter
							animateYearScrolling={false}
						/>
						<TextField
							className={classes.inputField}
							label="Address"
							name="address"
							value={address}
							onChange={this.handleChangeInput}
							multiline
						/>

						<div className={classes.actionButtonsContainer}>
							<Button
								className={classes.actionButton}
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
							>
								Save Location
							</Button>
							<Button
								className={classes.actionButton}
								variant="contained"
								color="secondary"
								fullWidth
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>

				<div className={classes.activitiesContainer}>
					<Typography
						variant="h5"
						gutterBottom={true}
					>
						Activities
					</Typography>

					<Slider {...sliderSettings}>
						<div>
							<h3>1</h3>
						</div>
						<div>
							<h3>2</h3>
						</div>
						<div>
							<h3>3</h3>
						</div>
						<div>
							<h3>4</h3>
						</div>
						<div>
							<h3>5</h3>
						</div>
						<div>
							<h3>6</h3>
						</div>
					</Slider>
				</div>
			</div>
		);
	}

}

LocationEditPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
)(LocationEditPage);