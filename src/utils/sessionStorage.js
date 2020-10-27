

export class SessionStorage {

    static _token = null;

    static set token(value) {
        this.put(value);
        this._token = value;
    }

    static get token() {
        if (!this._token) {
            this._token = this.getFromStorage();
        }

        return this._token;
    }

    static getFromStorage() {
        return localStorage.getItem('ga');
    }

    static pickFromHeader(headers) {
        this.token = headers['goaway'];
    }

    static put(value) {
        localStorage.setItem('ga', value);
    }

    static clear() {
        localStorage.removeItem('ga');
    }

}
