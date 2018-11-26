import React from 'react';
import {TextField} from '@material-ui/core';

class LocationEditPage extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	//loads custom fields, defined by the user which are not included in standard
	loadCustomFields() {

	}

	saveLocation() {

	}

	render() {
		return (
			<div>
				<h1>Edit Location</h1>

				<TextField
					label="Title"
				/>
			</div>
		);
	}

}

export default LocationEditPage;