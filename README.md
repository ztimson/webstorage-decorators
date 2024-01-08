<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="https://git.zakscode.com/repo-avatars/60b47463c877db0d03d41f265a24df35882f246e95df786de38a19fbb617d310" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### webstorage-decorators

  <!-- Description -->
  TypeScript: Sync variables with localStorage

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/webstorage-decorators/tags&query=$[0].name)](https://git.zakscode.com/ztimson/webstorage-decorators/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/webstorage-decorators&query=open_pr_counter)](https://git.zakscode.com/ztimson/webstorage-decorators/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/webstorage-decorators&query=open_issues_count)](https://git.zakscode.com/ztimson/webstorage-decorators/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/webstorage-decorators/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/webstorage-decorators/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/webstorage-decorators/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [WebStorage-Decorators](#top)
    - [About](#about)
        - [Examples](#examples)
        - [Built With](#built-with)
    - [Setup](#setup)
        - [Production](#production)
        - [Development](#development)
    - [Documentation](#documentation)
        - [Decorators](#decorators)
        - [WebStorageOptions](#webstorageoptions)
    - [License](#license)

## About

**Deprecated:** Please use the replacement library [var-persist](https://git.zakscode.com/ztimson/var-persist).

WebStorage-Decorators is a library that adds property decorators to sync a class property with the local or session storage. It is useful for persisting state through reloads without making any changes to existing code. 

This library has some caveats that [var-persist](https://git.zakscode.com/ztimson/var-persist) rectifies:
 - Only supports decorators
 - Impure functions can make changes to data which do not get synced
 - [Proto]types and functions are lost

**Disclaimer:** JavaScript's decorators are currently undergoing changes to the API overseen by [TC39](https://tc39.es) and currently have no support for property decorators. [Experimental decorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) must be enabled to work properly.

### Examples

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

### Built With
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="production" style="display: inline">
    Production
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install persist: `npm i webstorage-decorators`
2. Enable decorators inside `tsconfig.json`:
```json
{
	"compilerOptions": {
		"experimentalDecorators": true,
		...
	},
	...
}
```
3. Import & use, see [examples above](#examples)

</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm i`
2. Build library & docs: `npm build`
3. Run unit tests: `npm test`

</details>

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

## License

Copyright © 2023 Zakary Timson | Available under MIT Licensing

See the [license](./LICENSE) for more information.
