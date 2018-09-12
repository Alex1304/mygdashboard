import React, { Component } from 'react';
import './MainMenu.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

class MainMenu extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <section className="MainMenu">
                <ContainerTitle style={{ height: '50%' }}>Hello {this.props.username}! Here you can manage your Geometry Dash account. What do you want to do?</ContainerTitle>

                <div className="MainMenu-buttonGroup">
                    <Button text="Change username" />
                    <Button text="Change password" />
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.login.isLoggedIn,
        username: state.login.username,
    };
}

export default connect(mapStateToProps)(MainMenu);
