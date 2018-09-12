import React, { Component } from 'react';
import './LoginScreen.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

class LoginScreen extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="LoginScreen">
                <ContainerTitle style={{ height: '36%' }}>Please login to your Geometry Dash account to continue</ContainerTitle>
                <form>
                    <InputGroup inputID="gdusername" placeholder="Username" groupText={<FontAwesomeIcon icon="user" />} />
                    <InputGroup inputID="gdpassword" placeholder="Password" groupText={<FontAwesomeIcon icon="key" />} type="password" />
                    <Button text="Login" type="success" isSubmit />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
    };
}

export default connect(mapStateToProps)(LoginScreen);
