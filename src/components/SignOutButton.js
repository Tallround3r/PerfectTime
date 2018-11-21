import React from 'react';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const SignOutButton = (props) => {
	const {firebase} = props;

	return <Button
		type="button"
		onClick={firebase.logout}
		color="secondary"
	>
		Logout
	</Button>;
};

SignOutButton.propTypes = {
	firebase: PropTypes.shape({
		logout: PropTypes.func.isRequired,
	}),
};

export default compose(
	firebaseConnect(),
)(SignOutButton);