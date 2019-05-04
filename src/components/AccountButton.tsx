import Button from '@material-ui/core/Button';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';

interface AccountButtonProps {
	auth: any,
}

const AccountButton = (props: AccountButtonProps) =>
	<Link to={routes.USER(props.auth.uid)}>
		<Button
			type='button'
			color='secondary'
		>
			Account
		</Button>
	</Link>;

export default connect(
	({firebase: {auth}}: any) => ({
		auth,
	}),
)(AccountButton);
