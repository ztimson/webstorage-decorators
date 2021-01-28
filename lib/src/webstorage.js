"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorage = exports.LocalStorage = void 0;
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
function LocalStorage(defaultValue, opts = {}) {
    opts.default = defaultValue;
    return storage(localStorage, opts);
}
exports.LocalStorage = LocalStorage;
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
function SessionStorage(defaultValue, opts = {}) {
    opts.default = defaultValue;
    return storage(sessionStorage, opts);
}
exports.SessionStorage = SessionStorage;
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
function storage(storage, opts) {
    return function (target, key) {
        if (!opts.key)
            opts.key = key;
        Object.defineProperty(target, key, {
            get: function () {
                const storageVal = storage.getItem(opts.key);
                if (storageVal == null || storageVal == 'null' || storageVal == 'undefined')
                    return opts.default || null;
                return JSON.parse(storageVal);
            },
            set: function (value) {
                if (value == null)
                    storage.removeItem(opts.key);
                storage.setItem(opts.key, JSON.stringify(value));
            }
        });
    };
}
