import React from 'react';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import {Button, Paper, TextField, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import DatePicker from 'material-ui-pickers/DatePicker';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as routes from '../constants/routes';
import {Location} from '../models'


const styles = theme => ({
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: theme.spacing.unit,
		paddingRight: theme.spacing.unit * 10,
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
});


const INITIAL_STATE = {
	title: '',
	description: '',
	date: new Date(),
	address: '',
};

class LocationEditPage extends React.Component {

	state = {
		...INITIAL_STATE,
	};

	componentDidMount() {

	}

	//loads custom fields, defined by the user which are not included in standard
	loadCustomFields() {

	}

	saveLocation() {

	}

	handleChangeInput = e => {
		const {name, value} = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleChangeDate = date => {
		this.setState({
			date,
		});
	};

	render() {
		const {classes} = this.props;
		const {title, description, date, address} = this.state;

		const sliderSettings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			}],
		};

		return (
			<div>
				<h1>Edit Location</h1>

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

					<form className={classes.inputContainer}>
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

				<div>
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

export default compose(
	withStyles(styles),
)(LocationEditPage);