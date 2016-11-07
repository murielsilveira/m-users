class UserGateway {
    constructor() {
        this._BASE_URL = 'http://js-assessment-backend.herokuapp.com/'
    }

    getAllUsers() {
        return fetch(this._BASE_URL + 'users.json')
            .then(usersResponse => usersResponse.json())
            .then(rawUsers => {
                return Promise.resolve(
                    rawUsers.map(this._normalizeUser)
                )
            })
            .then(users => {
                return Promise.resolve(users.sort((a, b) => {
                    const nameA = a.firstName + a.lastName
                    const nameB = b.firstName + b.lastName
                    if (nameA < nameB) return -1
                    if (nameA > nameB) return 1
                    return 0
                }))
            })
    }

    getUser(userId) {
        return fetch(this._BASE_URL + `users/${userId}.json`)
            .then(userResponse => userResponse.json())
            .then(rawUser => {
                return Promise.resolve(this._normalizeUser(rawUser))
            })
    }

    _normalizeUser(rawUser) {
        return {
            userId: rawUser.id,
            status: rawUser.status,
            firstName: rawUser.first_name,
            lastName: rawUser.last_name,
            createdAt: rawUser.created_at,
        }
    }

    updateUser(user) {
        const putData = {
            'first_name': user.firstName,
            'last_name': user.lastName
        }
        return this._update(user.userId, putData)
    }

    lockUser(userId) {
        const putData = { 'status': 'locked' }
        return this._update(userId, putData)
    }

    activateUser(userId) {
        const putData = { 'status': 'active' }
        return this._update(userId, putData)
    }

    _update(userId, putData) {
        return fetch(this._BASE_URL + `users/${userId}/`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(putData)
        })
    }

    createUser(user) {
        const postData = {
            'first_name': user.firstName,
            'last_name': user.lastName,
            'status': 'active'
        }
        return fetch(this._BASE_URL + 'users/', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(postData)
        })
    }
}
