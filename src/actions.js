import fetch from 'cross-fetch';
import config from './config.json';

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

export function submitChangeUsername(username) {
    return {
        type: 'CHANGE_USERNAME_SUBMIT',
        username,
    };
}

export function receiveChangeUsernameSuccess(user, dispatch) {
    return {
        type: 'CHANGE_USERNAME_ACK',
        user,
        dispatch,
    };
}

export function receiveChangeUsernameError(error) {
    return {
        type: 'CHANGE_USERNAME_ERROR',
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
            else
                dispatch(receiveLoginSuccess(data.user, data.token));
        });
    };
}

export function asyncChangeUsername(username, token) {
    return dispatch => {
        dispatch(submitChangeUsername(username));

        return fetch(config.api_url + '/me/username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
            },
            body: JSON.stringify({ username }),
        }).then(
            response => response.json(),
            error => dispatch(receiveChangeUsernameError({ message: 'An unknown error occured.' }))
        ).then(data => {
            if (data.message) {
                dispatch(receiveChangeUsernameError(data));
            } else {
                dispatch(receiveChangeUsernameSuccess(data, dispatch));
                dispatch(redirect('/'));
            }
        });
    };
}
