import React from 'react';
import {TextField} from '@material-ui/core';

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
				<TextField
					label="Description"
					name="description"
					value={description}
					onChange={this.handleChangeInput}
				/>
			</div>
		);
	}

}

export default LocationEditPage;