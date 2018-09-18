import { combineReducers } from 'redux';

import * as actions from './actions.js';

function user(state = null, action) {
    switch (action.type) {
        case 'LOGIN_ACK':
        case 'CHANGE_USERNAME_ACK':
            return action.user;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

function token(state = null, action) {
    switch (action.type) {
        case 'LOGIN_ACK':
            return action.token;
        default:
            return state;
    }
}

function error(state = null, action) {
    switch (action.type) {
        case 'LOGIN_ERROR':
        case 'CHANGE_USERNAME_ERROR':
            return action.error;
        case 'LOGIN_ACK':
        case 'CHANGE_USERNAME_ACK':
            return null;
        default:
            return state;
    }
}

function redirect(state = null, action) {
    switch (action.type) {
        case 'REDIRECT':
            return action.path;
        case 'REDIRECT_END':
            return null;
        default:
            return state;
    }
}

function overlay(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUBMIT':
        case 'CHANGE_USERNAME_SUBMIT':
            return { icon: 'LOADING' };
        case 'CHANGE_USERNAME_ACK':
            return {
                icon: 'SUCCESS',
                text: 'Username changed!',
                button: {
                    text: 'OK',
                    on_click: () => action.dispatch(actions.dismissOverlay()),
                },
            };
        case 'LOGIN_ACK':
        case 'LOGIN_ERROR':
        case 'CHANGE_USERNAME_ERROR':
        case 'LOGOUT':
        case 'OVERLAY_DISMISS':
            return {};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    token,
    error,
    redirect,
    overlay,
});

export default rootReducer;
