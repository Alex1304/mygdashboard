import React, { Component } from 'react';
import './LoginScreen.css';

import { Redirect } from 'react-router-dom';

class LoginScreen extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="LoginScreen">
                Hello World!
            </div>
        );
    }
}

export default LoginScreen;
