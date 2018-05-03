import {LocalStorage, SessionStorage} from './index'

class TestClass {
    @LocalStorage() localStorage: any;
    @SessionStorage() sessionStorage: any;
    @LocalStorage({fieldName: 'customKey'}) customKey: any;
    @LocalStorage({fieldName: 'encrypted', encryptionKey: 'ENCRYPTION_KEY'}) encrypted: any;
    @LocalStorage({defaultValue: 'test'}) defaultedStorage: any;
    @LocalStorage({defaultValue: {a: true, b: 'test', c: 3.14}}) objectDefault: any;
}

describe('LocalStorage Tests', () => {
    it('LocalStorage', () => {
        let testValue = Math.random().toString(36).substring(7);
        new TestClass().localStorage = testValue;
        expect(JSON.parse(<string>localStorage.getItem('_localStorage'))).toEqual(testValue);
    });

    it('SessionStorage', () => {
        let testValue = Math.random().toString(36).substring(7);
        new TestClass().sessionStorage = testValue;
        expect(JSON.parse(<string>sessionStorage.getItem('_sessionStorage'))).toEqual(testValue);
    });

    it('Custom Key', () => {
        let testValue = Math.random().toString(36).substring(7);
        new TestClass().customKey = testValue;
        expect(JSON.parse(<string>localStorage.getItem('customKey'))).toEqual(testValue);
    });

    it('Maintain Object Structure', () => {
        let testObject = new TestClass();
        let testValue = {a: Math.random().toString(36).substring(7), b: Math.random(), c: true, d: [{a: false}, {a: true}]};
        testObject.localStorage = testValue;
        expect(testObject.localStorage).toEqual(testValue);
    });

    describe('Default', () => {
        it('Default Value', () => {
            localStorage.removeItem('_defaultedStorage');
            let testObject = new TestClass();
            expect(testObject.defaultedStorage).toEqual('test');
        });

        it('Key Already Has Value', () => {
            let testValue = {a: Math.random().toString(36).substring(7), b: Math.random(), c: true, d: [{a: false}, {a: true}]};
            localStorage.setItem('_defaultedStorage', JSON.stringify(testValue));
            let testObject = new TestClass();
            expect(testObject.defaultedStorage).toEqual(testValue);
        });

        it('Using Object As Default', () => {
            let testObject = new TestClass();
            expect(testObject.objectDefault).toEqual({a: true, b: 'test', c: 3.14});
        })
    });

    describe('Encryption Tests', () => {
        it('Encrypt', () => {
            let testObject = new TestClass();
            let testValue = Math.random().toString(36).substring(7);
            testObject.encrypted = testValue;
            expect(JSON.parse(<string>localStorage.getItem('encrypted'))).not.toEqual(testValue);
        });

        it('Decrypt', () => {
            let testObject = new TestClass();
            let testValue = Math.random().toString(36).substring(7);
            testObject.encrypted = testValue;
            expect(testObject.encrypted).toEqual(testValue);
        });

        it('Maintain Object Structure', () => {
            let testObject = new TestClass();
            let testValue = {a: Math.random().toString(36).substring(7), b: Math.random(), c: true, d: [{a: false}, {a: true}]};
            testObject.encrypted = testValue;
            expect(testObject.encrypted).toEqual(testValue);
        });
    });
});
