import {AES, enc} from 'crypto-js';

export interface WebStorageOptions {
    fieldName?: string;
    encryptionKey?: string;
    defaultValue?: any;
}

export function LocalStorage(opts: WebStorageOptions) {
    if(!opts) opts = {};
    return storage(localStorage, opts);
}

export function SessionStorage(opts: WebStorageOptions) {
    if(!opts) opts = {};
    return storage(sessionStorage, opts);
}

function storage(storageType: Storage, opts: WebStorageOptions) {
    return function(target: object, key: string) {
        if(!opts.fieldName) opts.fieldName = key;

        Object.defineProperty(target, key, {
            get: function() {
                let value = storageType.getItem(<string>opts.fieldName);
                if(!value && opts.defaultValue != null) return opts.defaultValue;
                if(value != null && opts.encryptionKey) value = AES.decrypt(JSON.parse(value), opts.encryptionKey).toString(enc.Utf8);
                return JSON.parse(<string>value);
            },
            set: function(value) {
                if(value != null && opts.encryptionKey) value = AES.encrypt(JSON.stringify(value), opts.encryptionKey).toString();
                storageType.setItem(<string>opts.fieldName, JSON.stringify(value));
            }
        });
    };
}
