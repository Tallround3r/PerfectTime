import React from 'react';
import {TextField} from '@material-ui/core';
import Textarea from '@material-ui/core/es/InputBase/Textarea';

const INITIAL_STATE = {
	title: '',
	description: '',
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

	render() {
		const {title, description} = this.state;

		return (
			<div>
				<h1>Edit Location</h1>

				<TextField
					label="Title"
					name="title"
					value={title}
					onChange={this.handleChangeInput}
				/>
				<Textarea
					label="Description"
					name="description"
					value={description}
					onChange={this.handleChangeInput}
					multiline
					rows="4"
				/>

				{/* TODO: install and implement DatePicker */}

			</div>
		);
	}

}

export default LocationEditPage;