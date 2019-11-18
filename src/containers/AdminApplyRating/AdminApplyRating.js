import React, { Component } from 'react';
import './AdminApplyRating.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import Checkbox from './../../components/Checkbox';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class AdminApplyRating extends Component {
    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN') || isNaN(this.props.match.params.id)) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminApplyRating">
                <ContainerTitle>Rate level of ID {this.props.match.params.id}</ContainerTitle>
                <form onSubmit={e => {
                    e.preventDefault();
                    const stars = document.getElementById('stars').value;
                    const featured_score = document.getElementById('featured').value;
                    const is_epic = document.getElementById('epic').checked;
                    const verify_coins = document.getElementById('verify_coins').checked;
                    this.props.dispatch(actions.asyncApplyRating(this.props.match.params.id, stars, featured_score, is_epic, verify_coins));
                }}>
                    <InputGroup inputID="stars" groupText={<FontAwesomeIcon icon="star" />} placeholder="Amount of stars" />
                    <InputGroup inputID="featured" groupText={<FontAwesomeIcon icon="trophy" />} placeholder="Featured score" />
                    <Checkbox name="epic" text="Epic" />
                    <Checkbox name="verify_coins" text="Verify Coins" />
                    <Button type="success" text="Apply Rating" isSubmit />
                </form>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(AdminApplyRating);
