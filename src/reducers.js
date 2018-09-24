import { combineReducers } from 'redux';

import * as actions from './actions.js';

function user(state = null, action) {
    switch (action.type) {
        case 'LOGIN_ACK':
        case 'UPDATE_CREDENTIALS_ACK':
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
        case 'UPDATE_CREDENTIALS_SUBMIT':
            return { icon: 'LOADING' };
        case 'UPDATE_CREDENTIALS_ACK':
            return {
                icon: 'SUCCESS',
                text: 'Credentials changed!',
                button: 'Go back to homepage',
            };
        case 'LOGIN_ERROR':
        case 'UPDATE_CREDENTIALS_ERROR':
            return {
                icon: 'FAILED',
                text: action.error.message,
                button: 'OK',
            };
        case 'LOGIN_ACK':
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
    redirect,
    overlay,
});

export default rootReducer;
