import React, { Component } from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './../../configureStore';
import icons from './../../icons';
import * as storage from './../../storage.js';

import MainMenu from './../../containers/MainMenu';
import LoginScreen from './../../containers/LoginScreen';
import VerifyAccount from './../../containers/VerifyAccount';
import UnverifiedAccount from './../../containers/UnverifiedAccount';
import ForgotPassword from './../../containers/ForgotPassword';
import ResetPassword from './../../containers/ResetPassword';
import UpdateCredentials from './../../containers/UpdateCredentials';
import AdminDailyTables from './../../containers/AdminDailyTables';
import AdminManageMods from './../../containers/AdminManageMods';
import AdminRateLevels from './../../containers/AdminRateLevels';
import AdminDeleteLevels from './../../containers/AdminDeleteLevels';
import AdminApplyRating from './../../containers/AdminApplyRating';

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
                            <Route path="/verify-account" component={VerifyAccount} />
                            <Route path="/unverified-account" component={UnverifiedAccount} />
                            <Route path="/update-credentials" component={UpdateCredentials} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                            <Route path="/recover-password" component={ResetPassword} />
                            <Route path="/admin/daily-tables" component={AdminDailyTables} />
                            <Route path="/admin/manage-mods" component={AdminManageMods} />
                            <Route path="/admin/rate-levels" component={AdminRateLevels} />
                            <Route path="/admin/delete-levels" component={AdminDeleteLevels} />
                            <Route path="/admin/apply-rating/:id" component={AdminApplyRating} />
                            <Route component={MainMenu} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
