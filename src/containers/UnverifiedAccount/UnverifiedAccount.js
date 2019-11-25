import React, { Component } from 'react';
import './UnverifiedAccount.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class UnverifiedAccount extends Component {
    render() {
        if (this.props.user) {
            return <Redirect to="/" />
        }

        return (
            <section className="UnverifiedAccount">
                <ContainerTitle style={{ height: '28%', minHeight: '100px' }}>Unverified account</ContainerTitle>
                <div className="UnverifiedAccount-formContainer">
                    <p>The email address associated to this account has not been verified. Input your username below
                    if you haven't received the verification email in order to re-send it. If you've put the wrong email
                    when registering your Geometry Dash account, you may specify a new one here. Your account will be
                    updated with the new email in that case. To re-send verification on the same email you used on
                    registration, you can leave the new email field empty.</p>
                    <form onSubmit={e => {
                        e.preventDefault();
                        const username = document.getElementById('gdusername').value;
                        const email = document.getElementById('gdemail').value;

                        if (!username) {
                            this.props.dispatch(actions.receiveError('Username field is required'));
                        } else {
                            this.props.dispatch(actions.asyncResendVerification(username, email));
                        }
                    }}>
                        <InputGroup inputID="gdusername" placeholder="Username" groupText={<FontAwesomeIcon icon="user" />} />
                        <InputGroup inputID="gdemail" placeholder="New email address (optional)" groupText="@" />
                        <Button text="Re-send verification" type="success" isSubmit />
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

export default connect(mapStateToProps)(UnverifiedAccount);
