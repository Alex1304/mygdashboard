import React, { Component } from 'react';
import './ForgotPassword.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class ForgotPassword extends Component {
    render() {
        if (this.props.user) {
            return <Redirect to="/" />
        }

        return (
            <section className="ForgotPassword">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Enter your email address to reset your password</ContainerTitle>
                <div className="ForgotPassword-formContainer">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const email = document.getElementById('gdemail').value;

                        if (!email) {
                            this.props.dispatch(actions.receiveError('This field is required'));
                        } else {
                            this.props.dispatch(actions.asyncForgotPassword(email));
                        }
                    }}>
                        <InputGroup inputID="gdemail" placeholder="Email address" groupText="@" />
                        <Button text="Submit" type="success" isSubmit />
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

export default connect(mapStateToProps)(ForgotPassword);
