//import fetch from 'cross-fetch';

export function submitLogin(username, password) {
    return {
        type: 'LOGIN_SUBMIT',
        username,
        password,
    };
}
