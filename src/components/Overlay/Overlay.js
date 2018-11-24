import React from 'react';
import './Overlay.css';

import { connect } from 'react-redux';

import Button from './../Button';

import * as actions from './../../actions.js';

const Overlay = ({ overlay, dispatch }) => (
    <div className={"Overlay" + (overlay.icon ? "" : " Overlay-hide")}>
        {overlay.icon === 'LOADING' && <img src="/images/loadingCircle-hd.png" alt="Loading..." className="Overlay-loading" />}
        {overlay.icon === 'SUCCESS' && <img src="/images/success.png" alt="Success!" className="Overlay-success" />}
        {overlay.icon === 'FAILED' && <img src="/images/failed.png" alt="Failed." className="Overlay-failed" />}
        {overlay.text && <div className="Overlay-text">{overlay.text}</div>}
        {overlay.button && <Button type="primary" onClick={() => {
            dispatch(actions.dismissOverlay());
            if (overlay.onClick) overlay.onClick();
        }} text={overlay.button} />}
    </div>
);

function mapStateToProps(state) {
    return {
        overlay: state.overlay,
    };
}

export default connect(mapStateToProps)(Overlay);
