import fetch from 'cross-fetch';
import config from './config.json';
import * as storage from './storage.js';

export function submitLogin(username, password) {
    return {
        type: 'LOGIN_SUBMIT',
        username,
        password,
    };
}

export function receiveLoginSuccess(user, token) {
    return {
        type: 'LOGIN_ACK',
        user,
        token,
    };
}

export function receiveLoginError(error) {
    return {
        type: 'LOGIN_ERROR',
        error,
    };
}

export function submitUpdateCredentials(credentials) {
    return {
        type: 'UPDATE_CREDENTIALS_SUBMIT',
        credentials,
    };
}

export function receiveUpdateCredentialsSuccess(user) {
    return {
        type: 'UPDATE_CREDENTIALS_ACK',
        user,
    };
}

export function receiveUpdateCredentialsError(error) {
    return {
        type: 'UPDATE_CREDENTIALS_ERROR',
        error,
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

export function asyncLogin(username, password) {
    return dispatch => {
        dispatch(submitLogin(username, password));

        return fetch(config.api_url + '/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then(
            response => response.json(),
            error => dispatch(receiveLoginError({ message: 'An unknown error occured.' }))
        ).then(data => {
            if (!data.user || !data.token) {
                if (data.message) {
                    dispatch(receiveLoginError(data));
                } else {
                    dispatch(receiveLoginError({ message: 'An unknown error occured.' }))
                }
            }
            else {
                storage.save('user', JSON.stringify(data.user));
                storage.save('token', data.token);
                dispatch(receiveLoginSuccess(data.user, data.token));
            }
        });
    };
}

export function asyncUpdateCredentials(credentials, token) {
    return dispatch => {
        dispatch(submitUpdateCredentials(credentials));

        return fetch(config.api_url + '/me/credentials', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            },
            body: JSON.stringify(credentials),
        }).then(
            response => response.json(),
            error => dispatch(receiveUpdateCredentialsError({ message: 'An unknown error occured.' }))
        ).then(data => {
            if (data.message) {
                dispatch(receiveUpdateCredentialsError(data));
            } else {
                dispatch(receiveUpdateCredentialsSuccess(data));
                dispatch(redirect('/'));
            }
        });
    };
}
