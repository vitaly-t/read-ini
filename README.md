# read-ini

[![ci](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml/badge.svg)](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/nodejs-20%20--%2024-green.svg?logo=node.js&style=flat)](https://nodejs.org)

A simplistic reader of INI files for NodeJS.

## Install

```
$ npm i read-ini
```

## Usage

Function `readIniFile` takes an INI file path as input, and returns a JSON object
with all the variables. And it does so synchronously.

The library supports sections, with aliases, but without nesting.

**Input-file example**

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

readIniFile('./file.ini');
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

You can pass in optional callback as the second parameter, to convert key-values to their correct types.

```ts
readIniFile('./file.ini', ({key, value, section}) => {
    if (key === 'DB_PORT') {
        return parseInt(value); // convert to number
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
