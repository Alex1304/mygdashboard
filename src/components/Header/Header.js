import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => (
    <header className="Header">
        <nav className="Header-nav navbar navbar-expand-md navbar-dark bg-dark w-100">
            <a className="navbar-brand" href="#">MyGDashboard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {isLoggedIn &&
                        <div>
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                        </div>
                    }
                    {!isLoggedIn &&
                        <li className="nav-item active">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    }
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
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;
