class MUser extends HTMLElement {
    static get observedAttributes() {
        return ['status', 'firstName']
    }
    
    constructor() {
        super()
    }

    connectedCallback() {
        this._render()
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (this[attributeName] !== newValue) {
            this[attributeName] = newValue
        }

        if (oldValue !== newValue) {
            this._render()
        }
    }

    _render() {
        // render it's being called multiple times when I change
        // it's properties at the beginning.
        // at least it's not on the DOW yet

        let userLockedClass = this.isLocked ? 'user-locked' : ''

        this.innerHTML = `<div class="user ${userLockedClass}">
            <span class="user-first-name">${this.firstName}</span>
            <span class="user-last-name">Silveira</span>
            <a class="user-edit-btn" href="./edit-user.html?userId=55">edit</a>
            <div class="user-created-at">${new Date().toGMTString()}</div>
        </div>`
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
        this.setAttribute('firstName', this._firstName)
    }
}

customElements.define('m-user', MUser)
