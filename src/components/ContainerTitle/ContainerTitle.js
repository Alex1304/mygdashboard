import React from 'react';
import './ContainerTitle.css';

const ContainerTitle = ({ children, style }) => (
    <h2 className="ContainerTitle" style={style}>{children}</h2>
);

ContainerTitle.defaultProps = {
    style: {},
}

export default ContainerTitle;
