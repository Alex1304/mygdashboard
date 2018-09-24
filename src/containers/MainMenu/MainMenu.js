import React, { Component } from 'react';
import './MainMenu.css';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class MainMenu extends Component {
    render() {
        if (!this.props.user) {
            return <Redirect to="/login" />;
        }

        return (
            <section className="MainMenu">
                <ContainerTitle style={{ height: '50%' }}>Hello {this.props.user.username}! Here you can manage your Geometry Dash account. What do you want to do?</ContainerTitle>

                <div className="MainMenu-buttonGroup">
                    <Button text="Update credentials" onClick={() => this.props.dispatch(actions.redirect('/update-credentials'))} />
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

export default connect(mapStateToProps)(MainMenu);
