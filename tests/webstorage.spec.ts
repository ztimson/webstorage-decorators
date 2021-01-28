import {LocalStorage, SessionStorage} from "../src";

const CUSTOM_KEY = '__MY_KEY'

class TestClass {
    @LocalStorage() localStorage: any;
    @LocalStorage({a: true, b: 'test', c: 3.14}) defaultedLocalStorage: any;
    @LocalStorage(null, {key: CUSTOM_KEY}) customLocalStorage: any;
    @SessionStorage() sessionStorage: any;
    @SessionStorage({a: true, b: 'test', c: 3.14}) defaultedSessionStorage: any;
    @SessionStorage(null, {key: CUSTOM_KEY}) customSessionStorage: any;
}

describe('WebStorage', () => {
    let testComponent: TestClass;

    beforeEach(() => {
        localStorage.clear();
        testComponent = new TestClass();
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
    });
});
