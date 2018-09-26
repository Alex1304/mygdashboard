import React, { Component } from 'react';
import './ResetPassword.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class ResetPassword extends Component {
    componentWillMount() {
        const params = new window.URLSearchParams(this.props.location.search);
        this.props.dispatch(actions.updateToken(params.get('token')));
    }

    render() {
        if (this.props.user) {
            return <Redirect to="/" />
        }

        return (
            <section className="ResetPassword">
                <ContainerTitle style={{ height: '40%', minHeight: '100px' }}>Pick a new password</ContainerTitle>
                <div className="ResetPassword-formContainer">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const password = document.getElementById('gdnewpassword').value;
                        const password2 = document.getElementById('gdnewpasswordrepeat').value;

                        if (password !== password2) {
                            this.props.dispatch(actions.receiveError('Repeated password does not match'));
                        } else {
                            this.props.dispatch(actions.asyncResetPassword(password));
                        }
                    }}>
                        <InputGroup type="password" inputID="gdnewpassword" placeholder="New password" groupText={<FontAwesomeIcon icon="key" />} />
                        <InputGroup type="password" inputID="gdnewpasswordrepeat" placeholder="Repeat new password" groupText={<FontAwesomeIcon icon="key" />} />
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

export default connect(mapStateToProps)(ResetPassword);
