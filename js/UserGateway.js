class UserGateway {
    constructor() {
        this._BASE_URL = 'http://js-assessment-backend.herokuapp.com/'
    }

    getAllUsers() {
        return fetch(this._BASE_URL + 'users.json')
            .then(usersResponse => usersResponse.json())
    }

    getUser(userId) {
        return fetch(this._BASE_URL + `users/${userId}.json`)
            .then(userResponse => userResponse.json())
    }

    updateUser(user) {
        const putData = {
            "first_name": user.firstName,
            "last_name": user.lastName
        }

        return fetch(this._BASE_URL + `users/${user.userId}/`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(putData)
        })
    }
}
