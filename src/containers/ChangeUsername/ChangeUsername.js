import React, { Component } from 'react';
import './ChangeUsername.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class ChangeUsername extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/login" />
        }

        return (
            <section className="ChangeUsername">
                <ContainerTitle style={{ height: '36%', minHeight: '100px' }}>Change username</ContainerTitle>
                <div className="ChangeUsername-formContainer">
                    <div className="ChangeUsername-errors">{this.props.error ? this.props.error.message : null}</div>
                    <form onSubmit={e => {
                        e.preventDefault();
                        const username = document.getElementById('gdnewusername').value;

                        if (!username) {
                            this.props.dispatch(actions.receiveLoginError({ message: 'Username is empty' }));
                        } else {
                            this.props.dispatch(actions.asyncChangeUsername(username, this.props.token));
                        }
                    }}>
                        <InputGroup inputID="gdnewusername" placeholder="New username" groupText={<FontAwesomeIcon icon="user" />} />
                        <Button text="Submit" type="success" isSubmit />
                    </form>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.changeUsername.error,
        isLoggedIn: state.login.token && state.login.user,
        token: state.login.token,
    };
}

export default connect(mapStateToProps)(ChangeUsername);
