/**
 * Options to be used with WebStorage decorators
 * @category WebStorage
 */
export interface WebStorageOptions {
    /** Default value to provide if storage is empty */
    default?: any
    /** Key to save under */
    key?: string
}

/**
 * Automatically syncs localStorage with the decorated property.
 *
 * **Example**
 * ```
 * class Example {
 *     @LocalStorage() lastLogin: string;
 *     @LocalStorage(false, {key: '_hideMenu'}) hideMenu: boolean;
 * }
 * ```
 *
 * @category WebStorage
 * @param defaultValue Default value to return if property does no exist inside localStorage.
 * @param opts Any additional options
 */
export function LocalStorage(defaultValue?: any, opts: WebStorageOptions = {}) {
    opts.default = defaultValue;
    return storage(localStorage, opts);
}

/**
 * Automatically syncs sessionStorage with the decorated property.
 *
 * **Example**
 * ```
 * class Example {
 *     @SessionStorage() lastLogin: string;
 *     @SessionStorage(false, {key: '_hideMenu'}) hideMenu: boolean;
 * }
 * ```
 *
 * @category WebStorage
 * @param defaultValue Default value to return if property does no exist inside sessionStorage.
 * @param opts Any additional options
 */
export function SessionStorage(defaultValue?, opts: WebStorageOptions = {}) {
    opts.default = defaultValue;
    return storage(sessionStorage, opts);
}

/**
 * **Internal use only**
 *
 * Overrides the properties getter/setter methods to read/write from the provided storage endpoint.
 *
 * @hidden
 * @category WebStorage
 * @param storage Web Storage API
 * @param opts Any additional options
 */
function storage(storage: Storage, opts: WebStorageOptions) {
    return function(target: object, key: string) {
        if(!opts.key) opts.key = key;
        Object.defineProperty(target, key, {
            get: function() {
                const storageVal = storage.getItem(<string>opts.key);
                if(storageVal == null || storageVal == 'null' || storageVal == 'undefined') return opts.default || null;
                return JSON.parse(storageVal);
            },
            set: function(value) {
                if(value == null) storage.removeItem(<string>opts.key);
                storage.setItem(<string>opts.key, JSON.stringify(value));
            }
        });
    };
}
