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
                onClick: action.onClick,
            };
        case 'ERROR':
            return {
                icon: 'FAILED',
                text: action.errorMessage,
                button: action.buttonText,
                onClick: action.onClick,
            };
        case 'LOGOUT':
        case 'OVERLAY_DISMISS':
            return {};
        default:
            return state;
    }
}

function daily_tables(state = { type0: [], type1: [] }, action) {
    switch (action.type) {
        case 'UPDATE_DAILY_TABLES':
            if (action.periodic_type === 0) {
                return {
                    type0: action.table,
                    type1: state.type1,
                };
            } else {
                return {
                    type0: state.type0,
                    type1: action.table,
                };
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    token,
    redirect,
    overlay,
    daily_tables,
});

export default rootReducer;
