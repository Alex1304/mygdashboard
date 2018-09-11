import React, { Component } from 'react';
import './MainMenu.css';

import Button from './../../components/Button';

class MainMenu extends Component {
    render() {
        return (
            <section className="MainMenu">
                <h2 className="MainMenu-title">Hello (user)! Here you can manage your Geometry Dash account. What do you want to do?</h2>

                <div className="MainMenu-buttonGroup">
                    <Button text="Change username" />
                    <Button text="Change password" />
                </div>
            </section>
        );
    }
}

export default MainMenu;
