import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import '../styles/App.css';
import Main from './Main';

const App = () =>
	<Router>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Main/>
		</MuiPickersUtilsProvider>
	</Router>;

export default App;
