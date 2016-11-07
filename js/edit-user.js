class EditUser {
    constructor() {
        this.form = document.querySelector('.user-form')
        this._userGateway = new UserGateway()

        this._addEventListeners()
    }

    execute() {
        const userId = this._getUserId()
        this._userGateway.getUser(userId)
            .then(user => this._renderForm(user))
    }

    _addEventListeners() {
        this._onSubmitForm = this._onSubmitForm.bind(this)
        this.form.addEventListener('submit', this._onSubmitForm)
    }

    _onSubmitForm(event) {
        const firstName = this.form.elements.first_name.value
        const lastName = this.form.elements.last_name.value
        const userId = this.form.elements.user_id.value

        if (firstName && lastName) {
            this._userGateway.updateUser({
                userId,
                firstName,
                lastName
            }).then(() => {
                console.log('user saved')
                document.location = './index.html'
            })
        } else {
            console.log('invalid form')
        }

        event.preventDefault()
    }

    _renderForm(user) {
        const formElement = `
            <label class="label" for="first-name-label-id">
                First Name
                <input type="text" id="first-name-label-id" name="first_name" value="${user.first_name}" required/>
            </label>
            <label class="label" for="last-name-label-id">
                Last Name
            <input type="text" id="last-name-label-id" name="last_name" value="${user.last_name}" required/>
            </label>
            <input type="hidden" name="user_id" value="${user.id}" required/>
            <input type="submit" value="Save"/>
        `

        this.form.innerHTML = formElement
    }

    _getUserId() {
        return document.location.search
            .substr(1, document.location.search.length)
            .split('=')[1]
    }
}

new EditUser().execute()