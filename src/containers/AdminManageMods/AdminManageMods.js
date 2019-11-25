import React, { Component } from 'react';
import './AdminManageMods.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputGroup from './../../components/InputGroup';
import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';

import * as actions from './../../actions.js';

class AdminManageMods extends Component {

    componentDidMount() {
        this.reload();
    }

    setMod = name => {
        this.props.dispatch(actions.asyncChangeUserRoles(name, ["ROLE_MOD"], ["ROLE_ELDERMOD"]));
    };

    setElder = name => {
        this.props.dispatch(actions.asyncChangeUserRoles(name, ["ROLE_ELDERMOD"], ["ROLE_MOD"]));
    };

    demote = name => {
        this.props.dispatch(actions.asyncChangeUserRoles(name, [], ["ROLE_MOD", "ROLE_ELDERMOD"]));
    };

    reload = () => {
        this.props.dispatch(actions.asyncLoadModList());
    };

    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminManageMods">
                <ContainerTitle>Promote Moderator</ContainerTitle>
                <div className="AdminManageMods-input">
                    <InputGroup inputID="mod_name" groupText={<FontAwesomeIcon icon="user" />} placeholder="Enter a username" />
                    <Button type="success" text="Mod" onClick={() => this.setMod(document.getElementById('mod_name').value)} />
                    <Button type="danger" text="Elder" onClick={() => this.setElder(document.getElementById('mod_name').value)} />
                </div>
                <ContainerTitle>Moderator list</ContainerTitle>
                <div className="table-responsive">
                    <table className={"table table-dark"}>
                        <thead>
                            <tr>
                                <th scope="col">Player ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.mod_list.map((mod, i) => (
                                <tr key={i}>
                                    <td className="align-middle">{mod.id}</td>
                                    <td className="align-middle">{mod.name}</td>
                                    <td className="align-middle">{mod.roles.includes("ROLE_ELDERMOD") && <span>Elder </span>} Moderator</td>
                                    <td className="align-middle AdminManageMods-actions">
                                        {!mod.roles.includes("ROLE_ELDERMOD") && <Button type="success btn-sm" text="Promote To Elder" onClick={() => this.setElder(mod.name)} />}
                                        {mod.roles.includes("ROLE_ELDERMOD") && <Button type="primary btn-sm" text="Demote To Mod" onClick={() => this.setMod(mod.name)} />}
                                        <Button type="danger btn-sm" text="Demote" onClick={() => this.demote(mod.name)} />
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
        mod_list: state.mod_list,
    };
}

export default connect(mapStateToProps)(AdminManageMods);
