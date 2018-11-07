import React, {Component} from 'react';
import logo from '../images/logo_perfecttime.svg';
import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                       A very fancy app for planning trips can be found here soon
                    </p>
                    <a
                        className="App-link"
                        href="https://perfecttime608150251.wordpress.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hello World
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
