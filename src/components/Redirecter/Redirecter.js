import React from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions.js';

function execRedirect(path, dispatch) {
    if (path)
        dispatch(actions.endRedirect());
        
    return null;
}

const Redirecter = ({ path, dispatch }) => (
    <span>
        {execRedirect(path, dispatch)}
        {path && <Redirect push to={path} />}
    </span>
);

function mapStateToProps(state) {
    return {
        path: state.redirect,
    };
}

export default connect(mapStateToProps)(Redirecter);
