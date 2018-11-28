import React from 'react';
import {compose} from 'redux';
import {Button, Paper, TextField, withStyles} from '@material-ui/core';
import {AddPhotoAlternateOutlined} from '@material-ui/icons';
import DatePicker from 'material-ui-pickers/DatePicker';
import {NavLink} from 'react-router-dom';
import * as routes from '../constants/routes';


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
		justifyContent: 'space-evenly',
		marginTop: theme.spacing.unit * 3,
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

		return (
			<div>
				<h1>Edit Location</h1>

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
							type="submit"
							variant="contained"
							color="secondary"
						>
							Save Location
						</Button>
						<Button
							variant="contained"
							color="secondary"
						>
							Cancel
						</Button>
					</div>
				</form>

			</div>
		);
	}

}

export default compose(
	withStyles(styles),
)(LocationEditPage);