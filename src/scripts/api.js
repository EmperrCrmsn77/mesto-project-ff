
// Пставить лайк
export function setLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f'
        }
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

// Удалить лайк
export function removeLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f'
        }
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

export function updateAvatar(newAvatar) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me/avatar' , {
        method: 'PATCH',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar 
        })
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

export function getUserData() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
        method: 'GET',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f'
        }
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

export function getUsersCards() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-31/cards', {
        method: 'GET',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f'
        }
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

export function updateUserData(newName, newAbout) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })    
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    })
    .catch(err => console.error(err))
}

export function addNewCard(cardName, cardLink) {
    fetch('https://nomoreparties.co/v1/wff-cohort-31/cards', {
        method: 'POST',
        headers: {
            authorization: '428d970f-3132-41d3-a3a0-b87393bc025f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`)
    })
}