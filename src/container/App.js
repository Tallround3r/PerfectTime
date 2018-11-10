import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import '../styles/App.css';
import Main from './Main';

const App = () =>
	<Router>
		<Main/>
	</Router>;

export default App;
