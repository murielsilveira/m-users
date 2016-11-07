class MUser extends HTMLElement {
    static get observedAttributes() {
        return ['user-id', 'status', 'first-name', 'last-name', 'created-at']
    }
    
    constructor() {
        super()
    }

    connectedCallback() {
        this._render()
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (this[attributeName] !== newValue) {
            // camelCase attributes don't work, so I choose to have
            // a good API for the element and clear names for the attributes 
            if (attributeName === 'user-id') {
                this.userId = newValue
            } else if (attributeName === 'first-name') {
                this.firstName = newValue
            } else if (attributeName === 'last-name') {
                this.lastName = newValue
            } else if (attributeName === 'created-at') {
                this.createdAt = newValue
            } else {
                // attributes that doesn't have a dash `-`
                this[attributeName] = newValue
            }
        }

        if (oldValue !== newValue) {
            this._render()
        }
    }

    _render() {
        // render it's being called multiple times when I change
        // it's properties at the beginning. at least it's not on the DOM yet

        let userLockedClass = this.isLocked ? 'user-locked' : ''

        this.innerHTML = `<div class="user ${userLockedClass}">
            <span class="user-first-name">${this.firstName}</span>
            <span class="user-last-name">${this.lastName}</span>
            <a class="user-edit-btn" href="./edit-user.html?userId=${this.userId}">edit</a>
            <div class="user-created-at">${new Date(this.createdAt).toGMTString()}</div>
        </div>`
    }

    get userId() {
        return this._userId || null
    }

    set userId(value) {
        this._userId = value
        this.setAttribute('user-id', this._userId)
    }

    get status() {
        return this._status || 'active'
    }

    set status(value) {
        this._status = value
        this.setAttribute('status', this._status)
    }

    get isLocked() {
        return this.status === 'locked'
    }

    get firstName() {
        return this._firstName || ''
    }

    set firstName(value) {
        this._firstName = value
        this.setAttribute('first-name', this._firstName)
    }

    get lastName() {
        return this._lastName || ''
    }

    set lastName(value) {
        this._lastName = value
        this.setAttribute('last-name', this._lastName)
    }

    get createdAt() {
        return this._createdAt || new Date()
    }

    set createdAt(value) {
        this._createdAt = value
        this.setAttribute('created-at', this._createdAt)
    }
}

customElements.define('m-user', MUser)
