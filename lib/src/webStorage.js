"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
function LocalStorage(opts = {}) {
    return storage(localStorage, opts);
}
exports.LocalStorage = LocalStorage;
function SessionStorage(opts = {}) {
    return storage(sessionStorage, opts);
}
exports.SessionStorage = SessionStorage;
function storage(storageType, opts = {}) {
    return function (target, key) {
        if (!opts.fieldName)
            opts.fieldName = key;
        Object.defineProperty(target, key, {
            get: function () {
                let value = storageType.getItem(opts.fieldName);
                if (!value && opts.defaultValue != null)
                    return opts.defaultValue;
                if (value != null && opts.encryptionKey)
                    value = crypto_js_1.AES.decrypt(JSON.parse(value), opts.encryptionKey).toString(crypto_js_1.enc.Utf8);
                return JSON.parse(value);
            },
            set: function (value) {
                if (value != null && opts.encryptionKey)
                    value = crypto_js_1.AES.encrypt(JSON.stringify(value), opts.encryptionKey).toString();
                storageType.setItem(opts.fieldName, JSON.stringify(value));
            }
        });
    };
}
