import React, { Component } from 'react';
import './VerifyAccount.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';
import * as config from './../../config.json';

class VerifyAccount extends Component {

    handleCaptcha = captchaResponse => {
        const params = new window.URLSearchParams(this.props.location.search);
        this.props.dispatch(actions.asyncVerifyAccount(captchaResponse, params.get('token')));
    };

    render() {
        if (this.props.user) {
            return <Redirect to="/" />
        }

        window.grecaptcha.ready(() => {
            window.grecaptcha.render('recaptcha', {
                sitekey: config.recaptcha_key,
                theme: 'dark',
                callback: this.handleCaptcha,
            });
        })

        return (
            <section className="VerifyAccount">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Verify your account</ContainerTitle>
                <div className="VerifyAccount-captchaContainer">
                    <div id="recaptcha"></div>
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

export default connect(mapStateToProps)(VerifyAccount);
