import {LocalStorage, SessionStorage} from "../src";

// Mocks ===============================================================================================================
class StorageMock implements Storage {
    private store: {[key: string]: string} = {}

    get length() { return Object.keys(this.store).length; }

    clear() { this.store = {}; }
    getItem(key: string) { return this.store[key]; }
    setItem(key: string, value: string) { this.store[key] = value; }
    removeItem(key: string) { delete this.store[key]; }
    key(index: number) { return Object.keys(this.store)[index]; }
}

(<any>global).localStorage = new StorageMock();
(<any>global).sessionStorage = new StorageMock()
var localStorage: StorageMock;
localStorage = (<any>global).localStorage;
var sessionStorage: StorageMock;
sessionStorage = (<any>global).sessionStorage;

// Test Data ===========================================================================================================
const CUSTOM_KEY = '_MY_KEY'
class TestType {
    constructor(public first: string, public last: string) { }
    fullName() { return `${this.last}, ${this.first}`; }
}

class TestStorage {
    @LocalStorage() localStorage: any;
    @LocalStorage({a: true, b: 'test', c: 3.14}) defaultedLocalStorage: any;
    @LocalStorage(null, {key: CUSTOM_KEY}) customLocalStorage: any;
    @LocalStorage(new TestType('John', 'Smith')) objectLocalStorage!: TestType;
    @SessionStorage() sessionStorage: any;
    @SessionStorage({a: true, b: 'test', c: 3.14}) defaultedSessionStorage: any;
    @SessionStorage(null, {key: CUSTOM_KEY}) customSessionStorage: any;
    @SessionStorage(new TestType('John', 'Smith')) objectSessionStorage!: TestType;
}

// Tests ===============================================================================================================
describe('WebStorage Decorators', () => {
    let testComponent: TestStorage;
    beforeEach(() => {
        localStorage.clear();
        testComponent = new TestStorage();
    });

    describe('LocalStorage', () => {
        test('NULL Value', () => {
            expect(testComponent.localStorage).toBeNull();
            testComponent.localStorage = 0;
            expect(testComponent.localStorage).not.toBeNull();
            testComponent.localStorage = null;
            expect(testComponent.localStorage).toBeNull();
        });
        test('Default Value', () => expect(testComponent.defaultedLocalStorage.a).toBeTruthy());
        test('Number Value', () => {
            const testValue = Math.random();
            testComponent.localStorage = testValue;
            expect(localStorage.getItem('localStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.localStorage).toBe(testValue);
        });
        test('Arrays', () => {
            const testValue = [Math.random(), Math.random(), Math.random()];
            testComponent.localStorage = testValue;
            expect(localStorage.getItem('localStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.localStorage).toBe(testValue);
        });
        test('String Value', () => {
            const testValue = 'SOMETHING_RANDOM';
            testComponent.localStorage = testValue;
            expect(localStorage.getItem('localStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.localStorage).toBe(testValue);
        });
        test('Object Value', () => {
            const testValue = {a: Math.floor(Math.random() * 100), b: Math.random()};
            testComponent.localStorage = testValue;
            expect(localStorage.getItem('localStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.localStorage).toStrictEqual(testValue);
        });
        test('Custom Key', () => {
            const testValue = Math.random();
            testComponent.customLocalStorage = testValue;
            expect(localStorage.getItem(CUSTOM_KEY)).toBe(JSON.stringify(testValue));
            expect(testComponent.customLocalStorage).toBe(testValue);
        });
        test('Impure Functions', () => {
            testComponent.localStorage = [1];
            testComponent.localStorage.push(2);
            expect(localStorage.getItem('localStorage')).toStrictEqual(JSON.stringify([1]));
            testComponent.localStorage; // Trigger save
            expect(localStorage.getItem('localStorage')).toStrictEqual(JSON.stringify([1, 2]));
            expect(testComponent.localStorage).toStrictEqual([1, 2]);
        });
        test('Object Functions', () => {
            expect(testComponent.objectLocalStorage.fullName()).toEqual('Smith, John');
            testComponent.objectLocalStorage.last = 'Snow';
            testComponent.objectLocalStorage; // Trigger save
            expect(testComponent.objectLocalStorage.fullName()).toEqual('Snow, John');
        });
    });

    describe('SessionStorage', () => {
        test('NULL Value', () => {
            expect(testComponent.sessionStorage).toBeNull();
            testComponent.sessionStorage = 0;
            expect(testComponent.sessionStorage).not.toBeNull();
            testComponent.sessionStorage = null;
            expect(testComponent.sessionStorage).toBeNull();
        });
        test('Default Value', () => expect(testComponent.defaultedSessionStorage.a).toBeTruthy());
        test('Number Value', () => {
            const testValue = Math.random();
            testComponent.sessionStorage = testValue;
            expect(sessionStorage.getItem('sessionStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.sessionStorage).toBe(testValue);
        });
        test('Arrays', () => {
            const testValue = [Math.random(), Math.random(), Math.random()];
            testComponent.sessionStorage = testValue;
            expect(sessionStorage.getItem('sessionStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.sessionStorage).toBe(testValue);
        });
        test('String Value', () => {
            const testValue = 'SOMETHING_RANDOM';
            testComponent.sessionStorage = testValue;
            expect(sessionStorage.getItem('sessionStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.sessionStorage).toBe(testValue);
        });
        test('Object Value', () => {
            const testValue = {a: Math.floor(Math.random() * 100), b: Math.random()};
            testComponent.sessionStorage = testValue;
            expect(sessionStorage.getItem('sessionStorage')).toBe(JSON.stringify(testValue));
            expect(testComponent.sessionStorage).toStrictEqual(testValue);
        });
        test('Custom Key', () => {
            const testValue = Math.random();
            testComponent.customSessionStorage = testValue;
            expect(sessionStorage.getItem(CUSTOM_KEY)).toBe(JSON.stringify(testValue));
            expect(testComponent.customSessionStorage).toBe(testValue);
        });
        test('Impure Functions', () => {
            testComponent.sessionStorage = [1];
            testComponent.sessionStorage.push(2);
            expect(sessionStorage.getItem('sessionStorage')).toStrictEqual(JSON.stringify([1]));
            testComponent.sessionStorage; // Trigger save
            expect(sessionStorage.getItem('sessionStorage')).toStrictEqual(JSON.stringify([1, 2]));
            expect(testComponent.sessionStorage).toStrictEqual([1, 2]);
        });
        test('Object Functions', () => {
            expect(testComponent.objectSessionStorage.fullName()).toEqual('Smith, John');
            testComponent.objectSessionStorage.last = 'Snow';
            testComponent.objectSessionStorage; // Trigger save
            expect(testComponent.objectSessionStorage.fullName()).toEqual('Snow, John');
        });
    });
});
