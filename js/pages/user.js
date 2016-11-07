class EditUser {
    constructor() {
        this._form = document.querySelector('.user-form')
        this._userGateway = new UserGateway()

        this._addEventListeners()
    }

    execute() {
        const userId = this._getUserId()
        if (userId) {
            this._userGateway.getUser(userId)
                .then(user => this._renderForm(user))
        }
    }

    _addEventListeners() {
        this._onSubmitForm = this._onSubmitForm.bind(this)
        this._form.addEventListener('submit', this._onSubmitForm)
    }

    _onSubmitForm(event) {
        const firstName = this._form.elements.first_name.value
        const lastName = this._form.elements.last_name.value
        const userId = this._form.elements.user_id.value

        if (firstName && lastName) {
            let savePromisse
            if (userId) {
                savePromisse = this._userGateway
                    .updateUser({ userId, firstName, lastName })
            } else {
                savePromisse = this._userGateway
                    .createUser({ firstName, lastName })
            }

            savePromisse.then(() => {
                document.location = './index.html'
            })
        } else {
            console.log('invalid form')
        }

        event.preventDefault()
    }

    _renderForm(user) {
        this._form.elements.first_name.value = user.first_name
        this._form.elements.last_name.value = user.last_name
        this._form.elements.user_id.value = user.id
    }

    _getUserId() {
        return document.location.search
            .substr(1, document.location.search.length)
            .split('=')[1]
    }
}

new EditUser().execute()
