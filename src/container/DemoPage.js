import React, {Component} from 'react';
import logo from '../images/logo_perfecttime.svg';
import '../styles/App.css';
import * as routes from '../constants/routes';
import {NavLink} from 'react-router-dom';
import {onceGetUsers} from '../firebase/db';

class App extends Component {

	//exapmle to see how firebase is working
	componentDidMount(){
		onceGetUsers().then(snapshot => snapshot.forEach(element => console.log(element.data())));
    }

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<NavLink exact to={routes.LOCATIONS}>
						<img src={logo} className="App-logo" alt="logo"/>
					</NavLink>

					<p>
						A very fancy app for planning trips can be found here soon.
						{/*{onceGetUsers()}*/}
						{/*{this.state.users}*/}
					</p>
					<a
						className="App-link"
						href="https://perfecttime608150251.wordpress.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						WordPress
					</a>
				</header>
			</div>
		);
	}
}

export default App;
