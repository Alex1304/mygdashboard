import React from 'react';
import './Button.css';

const Button = ({ type, text, onClick, isSubmit }) => (
    <button className={"Button btn btn-" + type + ""} onClick={onClick} type={isSubmit ? "submit" : ""}>
        {text}
    </button>
);

Button.defaultProps = {
    type: "light",
    onClick: () => {}
};

export default Button;
