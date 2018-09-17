import React, { Component } from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './../../configureStore';
import icons from './../../icons';

import MainMenu from './../../containers/MainMenu';
import LoginScreen from './../../containers/LoginScreen';
import ChangeUsername from './../../containers/ChangeUsername';

import Header from './../../components/Header';
import Redirecter from './../../components/Redirecter';

icons();
const store = configureStore();

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Redirecter />
                        <Header />

                        <Switch>
                            <Route path="/login" component={LoginScreen} />
                            <Route path="/change-username" component={ChangeUsername} />
                            <Route component={MainMenu} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
