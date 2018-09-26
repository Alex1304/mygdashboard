import React, { Component } from 'react';
import './LoginScreen.css';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class LoginScreen extends Component {
    render() {
        if (this.props.user) {
            return <Redirect to="/" />
        }

        return (
            <section className="LoginScreen">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Please login to your Geometry Dash account to continue</ContainerTitle>
                <div className="LoginScreen-formContainer">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const username = document.getElementById('gdusername').value;
                        const password = document.getElementById('gdpassword').value;

                        if (!username || !password) {
                            this.props.dispatch(actions.receiveError('Username and/or password is empty'));
                        } else {
                            this.props.dispatch(actions.asyncLogin(username, password));
                        }

                    }}>
                        <InputGroup inputID="gdusername" placeholder="Username" groupText={<FontAwesomeIcon icon="user" />} />
                        <InputGroup inputID="gdpassword" placeholder="Password" groupText={<FontAwesomeIcon icon="key" />} type="password" />
                        <div className="LoginScreen-options">
                            <Link to="/forgot-password">Forgot username/password?</Link>
                            <Button text="Login" type="success" isSubmit />
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(LoginScreen);
