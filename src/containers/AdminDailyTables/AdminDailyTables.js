import React, { Component } from 'react';
import './AdminDailyTables.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import InputGroup from './../../components/InputGroup';
//import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';
import DailyTable from './../../components/DailyTable';

import * as actions from './../../actions.js';

class AdminDailyTables extends Component {

    componentWillMount() {
        this.reload(0);
        this.reload(1);
    }

    delete = (i, type) => {
        this.props.dispatch(actions.asyncRemoveFromDailyTable(i, type));
    };

    add = (id, type) => {
        this.props.dispatch(actions.asyncAddToDailyTable(id, type));
    };

    reload = type => {
        this.props.dispatch(actions.asyncLoadDailyTable(type));
    };

    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminDailyTables">
                <ContainerTitle style={{ height: '15%', minHeight: '60px' }}>Daily levels</ContainerTitle>
                <DailyTable type={0} dailies={this.props.daily_tables.type0}
                    onDelete={this.delete} onAdd={this.add} onReload={this.reload} />
                <ContainerTitle style={{ height: '15%', minHeight: '60px' }}>Weekly demons</ContainerTitle>
                <DailyTable type={1} dailies={this.props.daily_tables.type1}
                    onDelete={this.delete} onAdd={this.add} onReload={this.reload} />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        daily_tables: state.daily_tables,
    };
}

export default connect(mapStateToProps)(AdminDailyTables);
