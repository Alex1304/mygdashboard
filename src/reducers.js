import { combineReducers } from 'redux';

function user(state = null, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.user;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

function token(state = null, action) {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return action.token;
        case 'LOGOUT':
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
        case 'SUBMIT':
            return { icon: 'LOADING' };
        case 'SUCCESS':
            return {
                icon: 'SUCCESS',
                text: action.successMessage,
                button: action.buttonText,
            };
        case 'ERROR':
            return {
                icon: 'FAILED',
                text: action.errorMessage,
                button: action.buttonText,
            };
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
