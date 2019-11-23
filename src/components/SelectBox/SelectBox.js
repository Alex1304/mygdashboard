import React from 'react';
import './SelectBox.css';

const SelectBox = ({ inputID, label, options }) => (
    <div className="SelectBox form-group">
        <label htmlFor={inputID}>{label}</label>
        <select className="form-control" id={inputID}>
            {options.map((option, i) => (
                <option key={i} selected={!!option.selected} value={option.value}>{option.text}</option>
            ))}
        </select>
    </div>
);

SelectBox.defaultProps = {
    type: 'text',
};

export default SelectBox;
