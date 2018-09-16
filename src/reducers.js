import { combineReducers } from 'redux';

function login(state = { user: null, token: null, fetching: false }, action) {
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    login,
});

export default rootReducer;
