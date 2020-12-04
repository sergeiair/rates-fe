import {SessionStorage} from "./sessionStorage";

export function internalLogOut() {
    SessionStorage.clear();

    window.location.href = '/';
}
