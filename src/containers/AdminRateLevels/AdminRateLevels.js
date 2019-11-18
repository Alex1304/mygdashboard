import React, { Component } from 'react';
import './AdminRateLevels.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import SelectBox from './../../components/SelectBox';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class AdminRateLevels extends Component {

    componentDidMount() {
        this.props.dispatch(actions.asyncLoadModSends());
    }

    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminRateLevels">
                <ContainerTitle>Enter the ID of a level to rate</ContainerTitle>
                <div className="AdminRateLevels-idInput">
                    <InputGroup inputID="rate-level" placeholder="Enter a level ID" groupText={<FontAwesomeIcon icon="star" />} />
                    <Button type="primary" text="Rate" onClick={() => this.props.dispatch(actions.redirect('/admin/apply-rating/' + document.getElementById('rate-level').value))} />
                </div>
                <ContainerTitle>Moderator recommendations</ContainerTitle>
                <div class="AdminRateLevels-options">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const minStars = document.getElementById('min-stars').value || 1;
                        const maxStars = document.getElementById('max-stars').value || 10;
                        const maxSongUses = document.getElementById('max-song-uses').value || 0;
                        const sortMode = document.getElementById('sort-mode').value || 0;

                        if (minStars > maxStars) {
                            this.props.dispatch(actions.receiveError('Min stars cannot be greater than max stars'));
                        } else {
                            this.props.dispatch(actions.updateModSendsOptions(minStars, maxStars, maxSongUses, sortMode));
                            this.props.dispatch(actions.asyncLoadModSends());
                        }
                    }}>
                        <InputGroup type="number" inputID="min-stars" placeholder="Minimum stars" groupText={<FontAwesomeIcon icon="star" />} />
                        <InputGroup type="number" inputID="max-stars" placeholder="Maximum stars" groupText={<FontAwesomeIcon icon="star" />} />
                        <InputGroup type="number" inputID="max-song-uses" placeholder="Maximum song uses" groupText={<FontAwesomeIcon icon="music" />} />
                        <SelectBox inputID="sort-mode" label="Sort by:" options={[
                            {
                                text: 'Most recent levels',
                                value: 0,
                                selected: true,
                            },
                            {
                                text: 'Most sends',
                                value: 1,
                            },
                            {
                                text: 'Most recent sends',
                                value: 2,
                            }
                        ]} />
                        <Button type="success" isSubmit text="Submit" />
                    </form>
                </div>
                <div className="table-responsive">
                    <table className={"table table-dark"}>
                        <thead>
                            <tr>
                                <th scope="col">Level ID</th>
                                <th scope="col">Level name</th>
                                <th scope="col">Sends*</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.mod_sends.map((send, i) => (
                                <tr key={i}>
                                    <td className="align-middle">{send.level.id}</td>
                                    <td className="align-middle"><span className="AdminRateLevels-levelName">{send.level.name}</span> by {send.level.creator.name}</td>
                                    <td className="align-middle">
                                        <ul>
                                            {send.send_details.map((detail, j) => (
                                                <li key={j}>{detail.name} ({<FontAwesomeIcon icon="star" />} {detail.stars}, {(detail.featured && <span>featured</span>) || <span>rate-only</span>})</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="align-middle AdminRateLevels-actions">
                                        <Button type="primary btn-sm" text="Rate" onClick={() => this.props.dispatch(actions.redirect('/admin/apply-rating/' + send.level.id))} />
                                        <Button type="danger btn-sm" text="Remove" onClick={() => this.props.dispatch(actions.asyncRemoveModSend(send.level.id))} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="AdminRateLevels-bottomNote">
                    *Sends that don't match selected filter criteria are not displayed.
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        mod_sends: state.mod_sends,
    };
}

export default connect(mapStateToProps)(AdminRateLevels);
