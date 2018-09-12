import React, { Component } from 'react';
import './LoginScreen.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class LoginScreen extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }
        
        return (
            <section className="LoginScreen">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Please login to your Geometry Dash account to continue</ContainerTitle>
                <form onSubmit={e => {
                    e.preventDefault();
                    const username = document.getElementById('gdusername').value;
                    const password = document.getElementById('gdpassword').value;
                    this.props.dispatch(actions.submitLogin(username, password));
                }}>
                    <InputGroup inputID="gdusername" placeholder="Username" groupText={<FontAwesomeIcon icon="user" />} />
                    <InputGroup inputID="gdpassword" placeholder="Password" groupText={<FontAwesomeIcon icon="key" />} type="password" />
                    <Button text="Login" type="success" isSubmit />
                </form>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.login.isLoggedIn,
    };
}

export default connect(mapStateToProps)(LoginScreen);
