import {MuiThemeProvider} from '@material-ui/core/styles';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './container/App';
import './firebase';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import './styles/index.css';
import theme from './theme/theme';

dotenv.config();
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App/>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
