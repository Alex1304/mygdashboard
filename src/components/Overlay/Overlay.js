import React from 'react';
import './Overlay.css';

import { connect } from 'react-redux';

import Button from './../Button';

const Overlay = ({ overlay }) => (
    <div className={"Overlay" + (overlay.icon ? "" : " Overlay-hide")}>
        {overlay.icon === 'LOADING' && <img src="/images/loadingCircle-hd.png" alt="Loading..." className="Overlay-loading" />}
        {overlay.icon === 'SUCCESS' && <img src="/images/success.png" alt="Success!" className="Overlay-success" />}
        {overlay.icon === 'FAILED' && <img src="/images/failed.png" alt="Failed." className="Overlay-failed" />}
        {overlay.text && <div className="Overlay-text">{overlay.text}</div>}
        {overlay.button && <Button type="primary" onClick={overlay.button.on_click} text={overlay.button.text} />}
    </div>
);

function mapStateToProps(state) {
    return {
        overlay: state.overlay,
    };
}

export default connect(mapStateToProps)(Overlay);
