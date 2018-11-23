import React, { Component } from 'react';
import './AdminDailyTables.css';

import { /*Link,*/ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import InputGroup from './../../components/InputGroup';
//import Button from './../../components/Button';
import ContainerTitle from './../../components/ContainerTitle';
import DailyTable from './../../components/DailyTable';

//import * as actions from './../../actions.js';

class AdminDailyTables extends Component {
    render() {
        if (!this.props.user || !this.props.user.roles.includes('ROLE_ADMIN')) {
            return <Redirect to="/" />
        }

        return (
            <section className="AdminDailyTables">
                <ContainerTitle style={{ height: '15%', minHeight: '40px' }}>Daily tables</ContainerTitle>
                <DailyTable type={0} dailies={[
                    {
                        index: 1,
                        level: {
                            id: 555,
                            name: "Back on track",
                            creator: {
                                name: "RobTop"
                            },
                        },
                        periodStart: "01/01/2018",
                        periodEnd: "02/01/2018",
                    },
                    {
                        index: 2,
                        level: {
                            id: 556,
                            name: "Test",
                            creator: {
                                name: "Alex1304"
                            },
                        },
                        periodStart: "08/01/2018",
                        periodEnd: "09/01/2018",
                    },
                ]} onDelete={i => console.log("Deleted daily #" + i)} />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(AdminDailyTables);
