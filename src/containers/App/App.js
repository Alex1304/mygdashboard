import React, { Component } from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './../../configureStore';
import icons from './../../icons';
import * as storage from './../../storage.js';

import MainMenu from './../../containers/MainMenu';
import LoginScreen from './../../containers/LoginScreen';
import UpdateCredentials from './../../containers/UpdateCredentials';

import Header from './../../components/Header';
import Redirecter from './../../components/Redirecter';
import Overlay from './../../components/Overlay';

icons();
const store = configureStore({
    user: JSON.parse(storage.get('user')),
    token: storage.get('token'),
});

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Redirecter />
                        <Overlay />
                        <Header />

                        <Switch>
                            <Route path="/login" component={LoginScreen} />
                            <Route path="/update-credentials" component={UpdateCredentials} />
                            <Route component={MainMenu} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
