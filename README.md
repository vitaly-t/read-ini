# ini-reader

[![ci](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml/badge.svg)](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/nodejs-20%20--%2024-green.svg?logo=node.js&style=flat)](https://nodejs.org)

Very simple reader of INI files.

## Install

```
$ npm i read-ini
```

## Usage

```ts
import {parseIniFile} from 'read-ini';

const result = parseIniFile('./file.ini');
//=> result is a JSON object with all the variables
```

With value-type conversion:

```ts
const result = parseIniFile('./file.ini', ({key, value, section}) => {
    if (key === 'MY_INT_VALUE') {
        return parseInt(value);
    }
    return value; // else return the value
});
```
