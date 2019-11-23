import React, { Component } from 'react';
import './AdminDeleteLevels.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputGroup from './../../components/InputGroup';
import SelectBox from './../../components/SelectBox';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class AdminDeleteLevels extends Component {

    componentDidMount() {
        this.props.dispatch(actions.asyncLoadReports());
    }

    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminDeleteLevels">
                <ContainerTitle>Enter the ID of a level to delete</ContainerTitle>
                <div className="AdminDeleteLevels-idInput">
                    <InputGroup inputID="delete-level" placeholder="Enter a level ID" groupText={<FontAwesomeIcon icon="trash" />} />
                    <Button type="danger" text="Delete" onClick={() => this.props.dispatch(actions.asyncDeleteLevel(document.getElementById('delete-level').value))} />
                </div>
                <ContainerTitle>User reports</ContainerTitle>
                <div className="AdminDeleteLevels-options">
                    <form onSubmit={e => {
                        e.preventDefault();
                        const sortMode = document.getElementById('sort-mode').value || 0;

                        this.props.dispatch(actions.updateReportsOptions(sortMode));
                        this.props.dispatch(actions.asyncLoadReports());
                    }}>
                        <SelectBox inputID="sort-mode" label="Sort by:" options={[
                            {
                                text: 'Most recent levels',
                                value: 0,
                                selected: true,
                            },
                            {
                                text: 'Most reports',
                                value: 1,
                            },
                            {
                                text: 'Most recent reports',
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
                                <th scope="col">ID</th>
                                <th scope="col">Level name</th>
                                <th scope="col">Reports</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.reports.map((report, i) => (
                                <tr key={i}>
                                    <td className="align-middle">{report.level.id}</td>
                                    <td className="align-middle"><span className="AdminDeleteLevels-levelName">{report.level.name}</span> by {report.level.creator.name}</td>
                                    <td className="align-middle">{report.report_count}</td>
                                    <td className="align-middle AdminDeleteLevels-actions">
                                        <Button type="primary btn-sm" text="Ignore" onClick={() => this.props.dispatch(actions.asyncRemoveReport(report.level.id))} />
                                        <Button type="danger btn-sm" text="Delete Level" onClick={() => this.props.dispatch(actions.asyncDeleteLevel(report.level.id))} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        reports: state.reports,
    };
}

export default connect(mapStateToProps)(AdminDeleteLevels);
