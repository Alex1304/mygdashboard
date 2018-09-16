import fetch from 'cross-fetch';
import config from './config.json';

export function submitLogin(username, password) {
    return {
        type: 'LOGIN_SUBMIT',
        username,
        password,
    };
}

export function receiveLoginInfo(user, token) {
    return {
        type: 'LOGIN_ACK',
        user,
        token,
    }
}

export function receiveLoginError(error) {
    return {
        type: 'LOGIN_ERROR',
        error,
    }
}

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
                dispatch(receiveLoginInfo(data.user, data.token));
        })
    };
}
