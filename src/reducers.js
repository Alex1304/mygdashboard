import { combineReducers } from 'redux';

function login(state = {}, action) {
    if (action.type !== 'LOGIN_SUBMIT')
        return state;

    return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.username,
        password: action.password,
    });
}

const rootReducer = combineReducers({
    login,
});

export default rootReducer;
