const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    authorization: '428d970f-3132-41d3-a3a0-b87393bc025f'
}

export function setLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.authorization
        }
    })
    .then(checkResponseStatus)
}


export function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.authorization
        }
    })
    .then(checkResponseStatus)
}

export function updateAvatar(newAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar` , {
        method: 'PATCH',
        headers: {
            authorization: config.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar 
        })
    })
    .then(checkResponseStatus)
}

export function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: config.authorization
        }
    })
    .then(checkResponseStatus)
}

export function getUsersCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.authorization
        }
    })
    .then(checkResponseStatus)
}

export function updateUserData(newName, newAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })    
    })
    .then(checkResponseStatus)
}

export function addNewCard(cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(checkResponseStatus)
}

export function removeCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.authorization
        }
    })
    .then(checkResponseStatus)
}

function checkResponseStatus(res) {
    if(res.ok) {
        return res.json()  
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}