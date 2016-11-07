class UserGateway {
    constructor() {
        this._BASE_URL = 'http://js-assessment-backend.herokuapp.com/'
    }

    getAllUsers() {
        return fetch(this._BASE_URL + 'users.json')
            .then(usersResponse => usersResponse.json())
            .then(rawUsers => {
                const users = rawUsers.map(rawUser => ({
                    userId: rawUser.id,
                    status: rawUser.status,
                    firstName: rawUser.first_name,
                    lastName: rawUser.last_name,
                    createdAt: rawUser.created_at,
                }))
                return Promise.resolve(users)
            })
    }

    getUser(userId) {
        return fetch(this._BASE_URL + `users/${userId}.json`)
            .then(userResponse => userResponse.json())
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
}
