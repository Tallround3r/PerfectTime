import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import * as routes from '../constants/routes';
import {firebase} from '../firebase';

interface Props extends RouteComponentProps<any> {
	auth: any;
}

const withAuthorization = (authCondition: (auth: any) => boolean) => (Component: ComponentType) => {

	class WithAuthorization extends React.Component<Props> {
		componentDidMount() {
			firebase.auth.onAuthStateChanged((authUser) => {
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
			({firebase: {auth}}: any) => ({
				auth,
			}),
		),
	)(WithAuthorization);
};

export default withAuthorization;
