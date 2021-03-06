import Button from '@material-ui/core/Button';
import React from 'react';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';

interface Props {
	firebase: any;
}

const SignOutButton = (props: Props) => {
	const {firebase} = props;

	return <Button
		type='button'
		onClick={firebase.logout}
		color='secondary'
		variant='outlined'
		id='logOutButton'
	>
		Logout
	</Button>;
};

export default compose(
	firebaseConnect(),
)(SignOutButton);
