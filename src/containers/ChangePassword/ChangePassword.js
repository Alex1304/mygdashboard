import React, { Component } from 'react';
import './ChangePassword.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class ChangePassword extends Component {
    render() {
        if (!this.props.user) {
            return <Redirect to="/login" />
        }

        return (
            <section className="ChangePassword">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Change password</ContainerTitle>
                <div className="ChangePassword-formContainer">
                    <div className="ChangePassword-errors">{this.props.error ? this.props.error.message : null}</div>
                    <form onSubmit={e => {
                        e.preventDefault();
                        const password = document.getElementById('gdnewpassword').value;

                        if (!password) {
                            this.props.dispatch(actions.receiveChangePasswordError({ message: 'Password is empty' }));
                        } else {
                            this.props.dispatch(actions.asyncChangePassword(password, this.props.token));
                        }
                    }}>
                        <InputGroup type="password" inputID="gdnewpassword" placeholder="New password" groupText={<FontAwesomeIcon icon="key" />} />
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
        error: state.error,
        token: state.token,
    };
}

export default connect(mapStateToProps)(ChangePassword);
