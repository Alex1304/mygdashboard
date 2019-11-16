import React from 'react';
import './Checkbox.css';

const Checkbox = ({ name, text }) => (
    <div className="Checkbox">
        <input id={name} name={name} type="checkbox" />
        <label for={name}>{text}</label>
    </div>
);

export default Checkbox;
