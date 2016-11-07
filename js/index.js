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
        this._pagination.addEventListener('click', function(event){
            if (event.target.classList.contains('page')) {
                this._paginateTo(parseInt(event.target.getAttribute('pageNumber')))
                event.preventDefault()
            }
        }.bind(this))
    }
    
    _fetchUsers() {
        this._userGateway.getAllUsers()
            .then(users => {
                this._usersList = users
                this._showUsers(this._usersList.slice(0, 10))
                this._buildPagination()
            })
    }

    _showUsers(users) {
        let usersElements = ''

        users.forEach(user => {
            let userLockedClass = ''
            if (user.status === 'locked')
                userLockedClass = 'user-locked'

            usersElements += `<div class="user ${userLockedClass}">
                <span class="user-first-name">${user.first_name}</span>
                <span class="user-last-name">${user.last_name}</span>
                <a class="user-edit-btn" href="./edit-user.html?userId=${user.id}">edit</a>
                <div class="user-created-at">${new Date(user.created_at).toGMTString()}</div>
            </div>`
        })

        this._usersContainer.innerHTML = usersElements
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
