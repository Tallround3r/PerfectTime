import React from 'react';
import {TextField} from '@material-ui/core';
import DatePicker from 'material-ui-pickers/DatePicker';

const INITIAL_STATE = {
	title: '',
	description: '',
	date: new Date(),
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
		const {title, description, date} = this.state;

		return (
			<div>
				<h1>Edit Location</h1>

				<div>
					<TextField
						label="Title"
						name="title"
						value={title}
						onChange={this.handleChangeInput}
					/>
					<TextField
						label="Description"
						name="description"
						value={description}
						onChange={this.handleChangeInput}
						multiline
						rows="4"
					/>
					<DatePicker
						keyboard
						required
						value={date}
						onChange={this.handleChangeDate}
						label="Datum"
						format="MM/dd/yyyy"
						placeholder="MM/dd/yyyy"
						mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
						disableOpenOnEnter
						animateYearScrolling={false}
					/>
				</div>
			</div>
		);
	}

}

export default LocationEditPage;