import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import * as routes from '../constants/routes';
import {firebase} from '../firebase';
import {Trip} from '../types';

interface Props extends RouteComponentProps<any> {
	auth: any;
	trip: Trip;
}

const withAuthorization = (authCondition: (auth: any, ...args: any[]) => boolean) =>
	(Component: ComponentType): React.ComponentClass<any> => {

		class WithAuthorization extends React.Component<Props> {
			componentDidMount() {
				firebase.auth.onAuthStateChanged((authUser) => {
					if (!authCondition(authUser)) {
						this.props.history.push(routes.SIGN_IN);
					}
				});
			}

			render() {
				return this.props.auth ? <Component {...this.props} /> : null;
			}
		}

		return compose(
			withRouter,
			connect(
				({firebase: {auth}}: any) => ({
					auth,
				}),
			),
			// @ts-ignore
		)(WithAuthorization);
	};

export default withAuthorization;
