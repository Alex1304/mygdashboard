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

function mod_list(state = [], action) {
    switch (action.type) {
        case 'UPDATE_MOD_LIST':
            return action.mod_list;
        default:
            return state;
    }
}


function mod_sends(state = [], action) {
    switch (action.type) {
        case 'UPDATE_MOD_SENDS':
            return action.mod_sends;
        default:
            return state;
    }
}

function mod_sends_options(state = { min_stars: 0, max_stars: 10, max_song_uses: 0, sort_mode: 0 }, action) {
    switch (action.type) {
        case 'UPDATE_MOD_SENDS_OPTIONS':
            return {
                min_stars: action.min_stars,
                max_stars: action.max_stars,
                max_song_uses: action.max_song_uses,
                sort_mode: action.sort_mode,
            };
        default:
            return state;
    }
}

function reports(state = [], action) {
    switch (action.type) {
        case 'UPDATE_REPORTS':
            return action.reports;
        default:
            return state;
    }
}

function reports_options(state = 0, action) {
    switch (action.type) {
        case 'UPDATE_REPORTS_OPTIONS':
            return action.sort_mode;
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
    mod_list,
    mod_sends_options,
    mod_sends,
    reports_options,
    reports,
});

export default rootReducer;
