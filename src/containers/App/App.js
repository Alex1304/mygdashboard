import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import MainMenu from './../../containers/MainMenu';

import Header from './../../components/Header';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />

                <Switch>
                    <Route component={MainMenu} />
                </Switch>
            </div>
        );
    }
}

export default App;
