import React from 'react';
import './Header.css';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import * as actions from './../../actions.js';
import * as storage from './../../storage.js';

const Header = ({ user, dispatch }) => (
    <header className="Header">
        <nav className="Header-nav navbar navbar-expand-md navbar-dark bg-dark w-100">
            <Link to="/" className="navbar-brand">MyGDashboard</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {(user !== null && (
                    <div className="navbar-nav">
                        <Link to="/" className="nav-item active nav-link">Home</Link>
                        <span className="nav-item nav-link" onClick={() => {
                            dispatch(actions.logout());
                            storage.remove('user');
                            storage.remove('token');
                        }}>Logout</span>
                    </div>
                )) || (
                    <div className="navbar-nav">
                        <Link to="/login" className="nav-link">Login</Link>
                    </div>
                )}
                {/*
                        <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                        </li>
                */}
            </div>
        </nav>
    </header>
);

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(Header);
