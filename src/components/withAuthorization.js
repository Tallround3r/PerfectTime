import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {firebase} from '../firebase';

const withAuthorization = (authCondition) => (Component) => {

	class WithAuthorization extends React.Component {
		componentDidMount() {
			firebase.auth.onAuthStateChanged(authUser => {
				if (!authCondition(authUser)) {
					this.props.history.push(routes.SIGN_IN);
				}
			});
		}

		render() {
			return this.props.auth ? <Component/> : null;
		}
	}

	return compose(
		withRouter,
		connect(
			({firebase: {auth}}) => ({
				auth,
			}),
		),
	)(WithAuthorization);
};

export default withAuthorization;