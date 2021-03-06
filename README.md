# WebStorage Decorators
A Javascript library that adds property decorators to sync a class property with the local or session storage. Useful 
for persisting themes or local settings over reloads or maintaining filters/search options in the current user session.

## Quick Setup
 1. Install with: `npm install --save webstorage-decorators`
 2. Add the decorator to your property and use as normal!
 ```typescript
import {LocalStorage, SessionStorage} from 'webstorage-decorators';
 
export class MyCustomClass {
    @LocalStorage('light_theme', {key: 'site_theme'}) theme: string;
    @SessionStorage(null, {encryptWith: config.entryptionKey}) thisUser: User;
    @SessionStorage() searchBar: string;
     
    constructor() {
        console.log(this.theme, localStorage.getItem('theme')); // Output: 'light_theme', 'light_theme'
        console.log(this.user, localStorage.getItem('user')); // Output: null, undefined
        user = {first: 'John', last: 'Smith', ...}
        console.log(this.user, localStorage.getItem('user')); // Output: {first: 'John', last: 'Smith', ...}, **Some encrypted value**
    }
}
 ```

## Documentation

### Decorators

| Decorator | Description |
|-----------|-------------|
| @LocalStorage(defaultValue: any, options: WebStorageOptions) | Syncs property to LocalStorage item under the same name |
| @SessionStorage(defaultValue: any, options: WebStorageOptions) | Syncs property to SessionStorage item under the same name |

### WebStorageOptions

| Options | Description |
|---------|-------------|
| default | Default value, same as decorator's first argument |
| key | Key to reference value inside local/session storage (Defaults to the property name) |

## Caveats

### Custom Functions
You can technically store anything inside local/session storage however everything is serialized using javascript's JSON,
so anything extra (prototypes, functions, etc) will be lost. However if you provide a default value, it will be copied &
the data injected, giving you a workaround to accessing static properties (Does not work with arrays).

```typescript
class Person {
    constructor(public first: string, public last: string) { }
    fullName() { return `${this.last}, ${this.first}`; }
}

LocalStorage.setItem('example', '{"first": "John", "last": "Smith"}');
@LocalStorage(null) example!: Person;
console.log(example.fullName()) // ERROR: fullName function doesn't exist

LocalStorage.setItem('example2', '{"first": "John", "last": "Smith"}');
@LocalStorage(new Person(null, null)) example2!: Person;
console.log(example2.fullName()) // Works because we have a default object to copy type from
```

### Impure Functions
Impure functions don't use the Object's setter preventing the storage from being updated. To prevent this use a pure
function or save it manually by reading the variable. (Reading triggers change detection & save if there are differences)
```typescript
@LocalStorage([1, 2]) example: number[];
example.push(3) // Impure & won't update storage
console.log(localStorage.getItem('example')) // Output: [1, 2];
example; // Trigger save
console.log(localStorage.getItem('example')) // Output: [1, 2, 3];

// OR

example = example.concat([3]); // Pure function requires you to use the setter triggering automatic saving
```
