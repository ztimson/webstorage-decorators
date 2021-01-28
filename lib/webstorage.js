import * as crypto from 'crypto-js';
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
export function LocalStorage(defaultValue, opts = {}) {
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
export function SessionStorage(defaultValue, opts = {}) {
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
function fromStorage(storage, opts) {
    let storedVal = JSON.parse(storage.getItem(opts.key));
    if (storedVal == null) {
        if (opts.default == null)
            return null;
        if (opts.default != 'object')
            return opts.default;
        if (opts.default.constructor != null)
            return Object.assign(new opts.default.constructor(), opts.default);
        return Object.assign({}, opts.default);
    }
    if (opts.encryptWith != null)
        storedVal = JSON.parse(crypto.AES.decrypt(storedVal, opts.encryptWith).toString(crypto.enc.Utf8));
    if (typeof storedVal != 'object' || !Array.isArray(storedVal))
        return storedVal;
    if (opts.default != null && opts.default.constructor != null)
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
function decoratorBuilder(storage, opts) {
    return function (target, key) {
        if (!opts.key)
            opts.key = key;
        let field = fromStorage(storage, opts);
        Object.defineProperty(target, key, {
            get: function () {
                if (field != fromStorage(storage, opts)) {
                    console.log(typeof opts.default, field, fromStorage(storage, opts));
                    target[key] = field;
                }
                return field;
            },
            set: function (value) {
                field = value;
                if (value == null)
                    storage.removeItem(opts.key);
                if (opts.encryptWith != null)
                    value = crypto.AES.encrypt(JSON.stringify(value), opts.encryptWith).toString();
                storage.setItem(opts.key, JSON.stringify(value));
            }
        });
    };
}
//# sourceMappingURL=webstorage.js.map