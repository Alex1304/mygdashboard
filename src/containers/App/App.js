import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import MainMenu from './../../containers/MainMenu';
import LoginScreen from './../../containers/LoginScreen';

import Header from './../../components/Header';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        };
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} />

                <Switch>
                    <Route path="/login" render={() => <LoginScreen isLoggedIn={this.state.isLoggedIn} />} />
                    <Route render={() => <MainMenu isLoggedIn={this.state.isLoggedIn} />} />
                </Switch>
            </div>
        );
    }
}

export default App;
