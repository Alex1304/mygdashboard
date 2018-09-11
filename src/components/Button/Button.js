import React from 'react';
import './Button.css';

const Button = ({ type, text, onClick }) => (
    <button className={"Button btn btn-" + type + ""} onClick={onClick}>
        {text}
    </button>
);

Button.defaultProps = {
    type: "light",
    onClick: () => {}
};

export default Button;
