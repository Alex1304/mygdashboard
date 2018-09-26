import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions.js';

class Redirecter extends Component {
    clearRedirect = () => {
        if (this.props.path)
            this.props.dispatch(actions.endRedirect());
    }

    componentDidUpdate() {
        this.clearRedirect();
    }

    render() {
        return (
            <span>
                {this.props.path && <Redirect push to={this.props.path} />}
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        path: state.redirect,
    };
}

export default connect(mapStateToProps)(Redirecter);
