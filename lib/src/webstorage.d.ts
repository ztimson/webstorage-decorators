/**
 * Options to be used with WebStorage decorators
 * @category WebStorage
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
 * @category WebStorage
 * @param defaultValue Default value to return if property does no exist inside localStorage.
 * @param opts Any additional options
 */
export declare function LocalStorage(defaultValue?: any, opts?: WebStorageOptions): (target: object, key: string) => void;
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
export declare function SessionStorage(defaultValue?: any, opts?: WebStorageOptions): (target: object, key: string) => void;
