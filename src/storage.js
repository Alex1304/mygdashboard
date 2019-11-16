export function isSessionStorageSupported() {
    try {
        var storage = window['sessionStorage'], x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

export function save(item, value) {
    if (isSessionStorageSupported()) {
        window.sessionStorage.setItem(item, value);
    }
}

export function remove(item) {
    if (isSessionStorageSupported()) {
        window.sessionStorage.removeItem(item);
    }
}

export function get(item) {
    if (isSessionStorageSupported()) {
        return window.sessionStorage.getItem(item) || null;
    } else {
        return null;
    }
}
