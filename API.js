import { login, userUrl, token, baseUrl } from "./globalVariables.js";

let formName = document.querySelector('.add-form-name');
let formText = document.querySelector('.add-form-text');

export const getComments = () => {
    return fetch(`${baseUrl}${login}/comments`, {
        method: 'GET'
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер недоступен');
            }
            return response.json();
        });
};

export const postComment = () => {
    formText = document.querySelector('.add-form-text');
    return fetch(`${baseUrl}${login}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: formText.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') })
    });
};

export const loginUser = ({ loginInput, passwordInput }) => {
    return fetch(`${userUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ login: loginInput, password: passwordInput })
    })
        .then((responseData) => {
            return responseData.json();
        });
};

export const registrateUser = ({ loginInput, passwordInput, nameInput }) => {
    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({ login: loginInput, password: passwordInput, name: nameInput })
    })
        .then((responseData) => {
            return responseData.json();
        });
};