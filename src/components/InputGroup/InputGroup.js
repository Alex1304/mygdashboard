import React from 'react';
import './InputGroup.css';

const InputGroup = ({ inputID, placeholder, groupText, type }) => (
    <div className="InputGroup">
        <div className="input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">{groupText}</div>
            </div>
            <input type={type} className="form-control" id={inputID} placeholder={placeholder} />
        </div>
    </div>
);

InputGroup.defaultProps = {
    type: 'text',
};

export default InputGroup;
