import React, { Component } from 'react';
import './AdminRateLevels.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class AdminRateLevels extends Component {

    componentDidMount() {
        //this.props.dispatch(actions.asyncLoadModSends(i, type));
    }

    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminRateLevels">
                <ContainerTitle style={{ height: '15%', minHeight: '60px' }}>Enter the ID of a level to rate</ContainerTitle>
                <div className="AdminRateLevels-idInput">
                    <InputGroup inputID="rate-level" placeholder="Enter a level ID" groupText={<FontAwesomeIcon icon="star" />} />
                    <Button type="primary" text="Rate" onClick={() => this.props.dispatch(actions.redirect('/admin/apply-rating/' + document.getElementById('rate-level').value))} />
                </div>
                <ContainerTitle style={{ height: '15%', minHeight: '60px' }}>Moderator recommendations</ContainerTitle>
                {/*<div className="table-responsive">
                    <table className={"table table-light"}>
                        <thead>
                            <tr>
                                <th scope="col">LevelID</th>
                                <th scope="col">Name/Creator</th>
                                <th scope="col">Sends</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.sends.map((daily, i) => (
                                <tr key={i} className={"DailyTable-row" + (i === 0 ? " table-active" : "")}>
                                    <th className="align-middle" scope="row">{daily.level.id} {i === 0 && <span className="DailyTable-current">[current]</span>}</th>
                                    <td className="align-middle"><span className="DailyTable-levelName">{daily.level.name}</span> by {daily.level.creator.name}</td>
                                    <td className="align-middle">{utils.formatDate(daily.period_start)}</td>
                                    <td className="align-middle">{utils.formatDate(daily.period_end)}</td>
                                    <td className="align-middle"><Button type="danger btn-sm" text="Delete" onClick={() => onDelete(daily.index, type)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>*/}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        sends: state.sends,
    };
}

export default connect(mapStateToProps)(AdminRateLevels);
