import React from 'react';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const SignOutButton = (props) => {
	const {firestore} = props;

	return <Button
		type="button"
		onClick={firestore.logout()}
		color="secondary"
	>
		Sign Out
	</Button>;
};

SignOutButton.propTypes = {
	firestore: PropTypes.shape({
		logout: PropTypes.func.isRequired,
	}),
};

export default compose(
	firestoreConnect(),
)(SignOutButton);