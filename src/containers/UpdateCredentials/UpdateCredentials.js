import React, { Component } from 'react';
import './UpdateCredentials.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class UpdateCredentials extends Component {
    render() {
        if (!this.props.user) {
            return <Redirect to="/login" />
        }

        return (
            <section className="UpdateCredentials">
                <ContainerTitle style={{ height: '40%', minHeight: '100px' }}>Here you can update your credentials (username, password, email). Leave the field blank to make no changes. Current password field is required.</ContainerTitle>
                <div className="UpdateCredentials-formContainer">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const username = document.getElementById('gdnewusername').value;
                        const email = document.getElementById('gdnewemail').value;
                        const password = document.getElementById('gdnewpassword').value;
                        const password2 = document.getElementById('gdnewpasswordrepeat').value;
                        const currentPassword = document.getElementById('gdcurrentpassword').value;

                        if (!currentPassword) {
                            this.props.dispatch(actions.receiveError('Current password field is required'));
                        } else if (password !== password2) {
                            this.props.dispatch(actions.receiveError('Repeated password does not match'));
                        } else {
                            var credentials = {};

                            const assignCredentials = (name, value) => {
                                if (value) {
                                    credentials[name] = value;
                                }
                            };

                            assignCredentials('username', username);
                            assignCredentials('email', email);
                            assignCredentials('password', password);
                            assignCredentials('current_password', currentPassword);

                            this.props.dispatch(actions.asyncUpdateCredentials(credentials));
                        }
                    }}>
                        <InputGroup inputID="gdnewusername" placeholder={this.props.user.username} groupText={<FontAwesomeIcon icon="user" />} />
                        <InputGroup type="email" inputID="gdnewemail" placeholder={this.props.user.email} groupText="@" />
                        <InputGroup type="password" inputID="gdnewpassword" placeholder="New password" groupText={<FontAwesomeIcon icon="key" />} />
                        <InputGroup type="password" inputID="gdnewpasswordrepeat" placeholder="Repeat new password" groupText={<FontAwesomeIcon icon="key" />} />
                        <InputGroup type="password" inputID="gdcurrentpassword" placeholder="Current password" groupText={<FontAwesomeIcon icon="key" />} />
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
        token: state.token,
    };
}

export default connect(mapStateToProps)(UpdateCredentials);
