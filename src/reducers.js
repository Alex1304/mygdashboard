import { combineReducers } from 'redux';

function login(state = { user: null, token: null, fetching: false, error: null }, action) {
    switch (action.type) {
        case 'LOGIN_SUBMIT':
            return Object.assign({}, state, {
                fetching: true,
            });
        case 'LOGIN_ACK':
            return {
                user: action.user,
                token: action.token,
                fetching: false,
            };
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {
                fetching: false,
                error: action.error,
            });
        case 'LOGOUT':
            return {
                user: null,
                token: null,
                fetching: false,
            };
        default:
            return state;
    }
}

function changeUsername(state = { newUsername: null, fetching: false, error: null }, action) {
    switch (action.type) {
        case 'CHANGE_USERNAME_SUBMIT':
            return Object.assign({}, state, {
                fetching: true,
            });
        case 'CHANGE_USERNAME_ACK':
            return {
                newUsername: action.user.username,
                fetching: false,
            };
        case 'CHANGE_USERNAME_ERROR':
            return Object.assign({}, state, {
                fetching: false,
                error: action.error,
            });
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

const rootReducer = combineReducers({
    login,
    redirect,
    changeUsername,
});

export default rootReducer;
