/**
 * Options to be used with WebStorage decorators
 */
export interface WebStorageOptions {
    /** Default value to provide if storage is empty */
    default?: any;
    /** Key to save under */
    key?: string;
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
 * @param defaultValue Default value to return if property does no exist inside localStorage.
 * @param opts Any additional options
 */
export function LocalStorage(defaultValue?: any, opts: WebStorageOptions = {}) {
    opts.default = defaultValue;
    return decoratorBuilder(localStorage, opts);
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
 * @param defaultValue Default value to return if property does no exist inside sessionStorage.
 * @param opts Any additional options
 */
export function SessionStorage(defaultValue?: any, opts: WebStorageOptions = {}) {
    opts.default = defaultValue;
    return decoratorBuilder(sessionStorage, opts);
}

/**
 * **Internal use only**
 *
 * Fetch variable from storage & take care of any defaults, object definitions, encryption & serialization
 *
 * @param storage Web Storage API
 * @param opts Any additional options
 */
function fromStorage(storage: Storage, opts: WebStorageOptions) {
    let storedVal = storage.getItem(<string>opts.key);
    if(storedVal == null || storedVal == "" || storedVal == "undefined") {
        if(opts.default == null) return null;
        if(opts.default != 'object') return opts.default;
        if(opts.default.constructor != null) return Object.assign(new opts.default.constructor(), opts.default);
        let temp = Object.assign({}, opts.default);
        Object.setPrototypeOf(temp, Object.getPrototypeOf(opts.default));
        return temp;
    }
    storedVal = JSON.parse(<string>storedVal);
    if(typeof storedVal != 'object' || !Array.isArray(storedVal)) return storedVal;
    if(opts.default != null && opts.default.constructor != null)
        return Object.assign(new opts.default.constructor(), opts.default, storedVal);
    return Object.assign({}, opts.default, storedVal);
}

/**
 * **Internal use only**
 *
 * Overrides the properties getter/setter methods to read/write from the provided storage endpoint.
 *
 * @param storage Web Storage API
 * @param opts Any additional options
 */
function decoratorBuilder(storage: Storage, opts: WebStorageOptions) {
    return function(target: object, key: string) {
        if(!opts.key) opts.key = key;
        let field = fromStorage(storage, opts);
        Object.defineProperty(target, key, {
            get: function() {
                if(field != fromStorage(storage, {key: opts.key})) (<any>target)[key] = field;
                return field;
            },
            set: function(value?) {
                field = value;
                if(value == null) storage.removeItem(<string>opts.key);
                storage.setItem(<string>opts.key, JSON.stringify(value));
            }
        });
    };
}
