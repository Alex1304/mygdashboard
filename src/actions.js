import fetch from 'cross-fetch';
import config from './config.json';
import * as storage from './storage.js';

export function submit() {
    return {
        type: 'SUBMIT',
    };
}

export function receiveError(errorMessage, buttonText = 'OK') {
    return {
        type: 'ERROR',
        errorMessage,
        buttonText,
    };
}

export function receiveSuccess(successMessage, buttonText = 'OK', payload = {}) {
    return {
        type: 'SUCCESS',
        successMessage,
        buttonText,
        payload,
    };
}

export function updateUser(user) {
    storage.save('user', JSON.stringify(user));
    return {
        type: 'UPDATE_USER',
        user,
    };
}

export function updateToken(token) {
    storage.save('token', token);
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

/*
    ASYNC ACTIONS
*/

const processResponse = response => response.status !== 204 ? response.json() : null;
const processError = (error, dispatch) => dispatch(receiveError('An unknown error occured.'));
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
            dispatch(receiveSuccess('Credentials successfully updated!', 'Go to homepage'));
            dispatch(updateUser(data.user));
            dispatch(updateToken(data.token));
            dispatch(redirect('/'));
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
        }).then(processResponse, error => processError(error, dispatch)).then(data => {
            dispatch(dismissOverlay());
            dispatch(updateUser(null));
            dispatch(updateToken(null));
        });
    };
}
