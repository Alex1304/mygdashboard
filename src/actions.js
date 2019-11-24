import fetch from 'cross-fetch';
import config from './config.json';
import * as storage from './storage.js';

export function submit() {
    return {
        type: 'SUBMIT',
    };
}

export function receiveError(errorMessage, buttonText = 'OK', onClick = null) {
    return {
        type: 'ERROR',
        errorMessage,
        buttonText,
        onClick,
    };
}

export function receiveSuccess(successMessage, buttonText = 'OK', onClick = null) {
    return {
        type: 'SUCCESS',
        successMessage,
        buttonText,
        onClick,
    };
}

export function updateUser(user) {
    if (user) {
        storage.save('user', JSON.stringify(user));
    }
    return {
        type: 'UPDATE_USER',
        user,
    };
}

export function updateToken(token) {
    if (token) {
        storage.save('token', token);
    }
    return {
        type: 'UPDATE_TOKEN',
        token,
    };
}

export function logout() {
    return {
        type: 'LOGOUT'
    };
}

export function redirect(path) {
    return {
        type: 'REDIRECT',
        path,
    };
}

export function endRedirect() {
    return {
        type: 'REDIRECT_END',
    };
}

export function dismissOverlay() {
    return {
        type: 'OVERLAY_DISMISS',
    };
}

export function updateDailyTable(type, table) {
    return {
        type: 'UPDATE_DAILY_TABLES',
        periodic_type: type,
        table,
    };
}

export function updateModList(mod_list) {
    return {
        type: 'UPDATE_MOD_LIST',
        mod_list,
    };
}

export function updateModSends(mod_sends) {
    return {
        type: 'UPDATE_MOD_SENDS',
        mod_sends,
    };
}

export function updateModSendsOptions(min_stars, max_stars, max_song_uses, sort_mode) {
    return {
        type: 'UPDATE_MOD_SENDS_OPTIONS',
        min_stars,
        max_stars,
        max_song_uses,
        sort_mode,
    };
}

export function updateReports(reports) {
    return {
        type: 'UPDATE_REPORTS',
        reports,
    };
}

export function updateReportsOptions(sort_mode) {
    return {
        type: 'UPDATE_REPORTS_OPTIONS',
        sort_mode,
    };
}

/*
    ASYNC ACTIONS
*/

const processResponse = response => response.status !== 204 ? response.json() : null;
const processError = (error, dispatch) => dispatch(receiveError('An unknown error occured: ' + error));
const processData = (data, dispatch, func) => {
    if (data && data.message) {
        dispatch(receiveError(data.message));
    } else {
        func(data);
    }
};

export function asyncLogin(username, password) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            dispatch(updateUser(data.user));
            dispatch(updateToken(data.token));
        }));
    };
}

export function asyncUpdateCredentials(credentials) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/me/credentials', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
            body: JSON.stringify(credentials),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Credentials successfully updated! If you changed your email, an email has been sent '
                    + 'to your new address in order to verify it. If you changed your password, don\'t forget to refresh '
                    + 'your login in-game via Settings > Account > Refresh Login.', 'Go to homepage', () => dispatch(redirect('/'))));
            dispatch(updateUser(data.user));
            dispatch(updateToken(data.token));
        }));
    };
}

export function asyncForgotPassword(email) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/public/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('An email has been sent to ' + email + ' containing a link you must follow to reset your password. '
                + 'You can re-submit this form to send another email.'));
        }));
    }
}

export function asyncResetPassword(password) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/me/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
            body: JSON.stringify({ password }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Password successfully reset!', 'Go to dashboard'));
            dispatch(updateUser(data.user));
            dispatch(updateToken(data.token));
            dispatch(redirect('/'));
        }));
    };
}

export function asyncLogout() {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/token', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            dispatch(updateUser(null));
            dispatch(updateToken(null));
        }));
    };
}

export function asyncLoadDailyTable(type) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/periodic?type=' + type, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            }
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            let table = data.queued.slice();
            if (data.current !== null)
                table.push(data.current);
            table.reverse();
            dispatch(updateDailyTable(type, table));
        }));
    };
}

export function asyncAddToDailyTable(level_id, type) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/periodic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
            body: JSON.stringify({ level_id, type }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Level successfully added to table!', 'OK', () => {
                dispatch(asyncLoadDailyTable(type));
            }));
        }));
    };
}

export function asyncRemoveFromDailyTable(index, type) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/periodic?index=' + index, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Level successfully removed from table!', 'OK', () => {
                dispatch(asyncLoadDailyTable(type));
            }));
        }));
    };
}

export function asyncApplyRating(level_id, stars, featured_score, is_epic, verify_coins) {
    return (dispatch, getState) => {
        dispatch(submit());
        stars = stars ? stars : null;
        featured_score = featured_score ? featured_score : null;
        is_epic = is_epic ? true : false;
        verify_coins = verify_coins ? true : false;
        return fetch(config.api_url + '/admin/apply-rating', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
            body: JSON.stringify({ level_id, stars, featured_score, is_epic, verify_coins }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Rating successfully applied!', 'OK'));
        }));
    };
}

export function asyncLoadModList() {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/mod-list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            }
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            let mod_list = data.data.slice();
            dispatch(updateModList(mod_list));
        }));
    };
}

export function asyncChangeUserRoles(player_name, roles_to_add, roles_to_remove) {
    return (dispatch, getState) => {
        dispatch(submit());
        return fetch(config.api_url + '/admin/mod-list', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
            body: JSON.stringify({ player_name, roles_to_add, roles_to_remove }),
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('User roles successfully updated!', 'OK', () => dispatch(asyncLoadModList())));
        }));
    };
}

export function asyncLoadModSends() {
    return (dispatch, getState) => {
        dispatch(submit());

        let min_stars = getState().mod_sends_options.min_stars;
        let max_stars = getState().mod_sends_options.max_stars;
        let max_song_uses = getState().mod_sends_options.max_song_uses;
        let sort_mode = getState().mod_sends_options.sort_mode;
        let query = 'min_stars=' + min_stars
                + '&max_stars=' + max_stars
                + '&max_song_uses=' + max_song_uses
                + '&sort_mode=' + sort_mode;
        return fetch(config.api_url + '/admin/mod-suggestions?' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            let mod_sends = data.data.slice();
            dispatch(updateModSends(mod_sends));
        }));
    };
}

export function asyncRemoveModSend(id) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/mod-suggestions?level_id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Mod suggestion successfully removed!', 'OK', () => {
                dispatch(asyncLoadModSends());
            }));
        }));
    };
}

export function asyncLoadReports() {
    return (dispatch, getState) => {
        dispatch(submit());

        let sort_mode = getState().reports_options;
        return fetch(config.api_url + '/admin/level-reports?sort_mode=' + sort_mode, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(dismissOverlay());
            let reports = data.data.slice();
            dispatch(updateReports(reports));
        }));
    };
}

export function asyncRemoveReport(id) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/level-reports?level_id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Report successfully removed!', 'OK', () => {
                dispatch(asyncLoadReports());
            }));
        }));
    };
}

export function asyncDeleteLevel(id) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/admin/levels?level_id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': getState().token,
            },
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            dispatch(receiveSuccess('Level successfully deleted from servers!', 'OK', () => {
                dispatch(asyncLoadReports());
            }));
        }));
    };
}

export function asyncVerifyAccount(captchaResponse, token) {
    return (dispatch, getState) => {
        dispatch(submit());

        return fetch(config.api_url + '/public/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, captcha_response: captchaResponse })
        }).then(processResponse, error => processError(error, dispatch)).then(data => processData(data, dispatch, data => {
            console.warn(data);
            dispatch(receiveSuccess('Account verified!', 'OK', () => {
                dispatch(redirect('/login'));
            }));
        }));
    };
}
