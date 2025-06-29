# read-ini

[![ci](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml/badge.svg)](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/nodejs-20%20--%2024-green.svg?logo=node.js&style=flat)](https://nodejs.org)

A simple reader and parser of `.ini` (or `.env`) files for NodeJS.

## Install

```
$ npm i read-ini
```

## Usage

Function `readIniFile` takes an `.ini` (or `.env`) file path as input, and returns a JSON object
with all the variables. And it does so synchronously.

The library supports sections, with aliases, but without nesting.

**INI file example**

```ini
# full-line comment can start with #
SHARED_VALUE = some text

; full-line comment can start with ; 
[database]
DB_HOST = localhost
DB_PORT = 123
```

Reading the file above...

```ts
import {readIniFile} from 'read-ini';

readIniFile('./file.ini'); //=> JSON object
```

**Output:**

```js
{
  SHARED_VALUE: 'some text',
  database: {
    DB_HOST: 'localhost',
    DB_PORT: '123'
  }
}
```

### Value-type conversion

You can pass in an optional callback, as the second parameter, to convert values.

```ts
readIniFile('./file.ini', ({key, value, section}) => {
    if (key === 'DB_PORT') {
        return parseInt(value); // convert to integer
    }
    return value; // else return the value
});
```

**Output:**

```js
{
  SHARED_VALUE: 'some text',
  database: {
    DB_HOST: 'localhost',
    DB_PORT: 123
  }
}
```

### Environment Variables

To set environment variables from the output, you can use this helper:

```ts
function setEnvironmentVars(vars: { [name: string]: any }): void {
    for (const [name, value] of Object.entries(vars)) {
        if (typeof value !== 'object') {
            process.env[name] = value;
        }
    }
}
```

### Section Aliases

Optional section aliases are supported: `[section "alias"]`, and those simply replace the section name.

### Global Sections

Section name `global` is reserved (case-insensitive), to inject variables into the global scope from anywhere inside an INI file.
The same works for any section with `global` as alias.
