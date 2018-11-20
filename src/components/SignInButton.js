import React from 'react';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';

import Button from '@material-ui/core/Button';


const SignInButton = () =>
	<Link to={routes.SIGN_IN}>
		<Button
			type="button"
			color="secondary"
		>
			Sign In
		</Button>
	</Link>;

export default SignInButton;