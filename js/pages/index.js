class Index {
    constructor() {
        this._usersContainer = document.querySelector('.users-container')
        this._pagination = document.querySelector('.pagination')
        this._usersList = []

        this._userGateway = new UserGateway()

        this._addEventListeners()
    }

    execute() {
        this._fetchUsers()
    }

    _addEventListeners() {
        this._pagination.addEventListener('click', event => {
            if (event.target.classList.contains('page')) {
                this._paginateTo(parseInt(event.target.getAttribute('pageNumber')))
                event.preventDefault()
            }
        })

        this._usersContainer.addEventListener('lock-user', event => {
            this._lockUser(event.target)
            event.preventDefault()
        })

        this._usersContainer.addEventListener('activate-user', event => {
            this._activateUser(event.target)
            event.preventDefault()
        })

        this._usersContainer.addEventListener('edit-user', event => {
            document.location = `./user.html?userId=${event.target.userId}`
            event.preventDefault()
        })
    }
    
    _fetchUsers() {
        this._userGateway.getAllUsers()
            .then(users => {
                this._usersList = users
                this._showUsers(this._usersList.slice(0, 10))
                this._buildPagination()
            })
    }

    _lockUser(mUser) {
        this._userGateway.lockUser(mUser.userId)
            .then(_ => mUser.status = 'locked')
    }

    _activateUser(mUser) {
        this._userGateway.activateUser(mUser.userId)
            .then(_ => mUser.status = 'active')
    }

    _showUsers(users) {
        const fragment = document.createDocumentFragment() 

        users.forEach(user => {
            const mUser = new MUser()
            mUser.userId = user.userId
            mUser.status = user.status
            mUser.firstName = user.firstName
            mUser.lastName = user.lastName
            mUser.createdAt = user.createdAt
            fragment.appendChild(mUser)
        })

        this._usersContainer.innerHTML = ''
        this._usersContainer.appendChild(fragment)
    }

    _buildPagination() {
        const numberOfUsers = this._usersList.length
        if (numberOfUsers > 10) {
            const numberOfPages = Math.ceil(numberOfUsers / 10)
            let pagesElements = ''
            for (let page = 1; page <= numberOfPages; page++) {
                pagesElements += `<button class="page" pageNumber="${page}">${page}</button>`
            }
            this._pagination.innerHTML = pagesElements
        }
    }

    _paginateTo(page) {
        const end = 10 * page
        const start = end - 10
        this._showUsers(this._usersList.slice(start, end))
    }
}

new Index().execute()
