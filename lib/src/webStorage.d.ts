export interface WebStorageOptions {
    fieldName?: string;
    encryptionKey?: string;
    defaultValue?: any;
}
export declare function LocalStorage(opts?: WebStorageOptions): (target: object, key: string) => void;
export declare function SessionStorage(opts?: WebStorageOptions): (target: object, key: string) => void;
