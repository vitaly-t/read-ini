# ini-reader

[![ci](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml/badge.svg)](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/nodejs-20%20--%2024-green.svg?logo=node.js&style=flat)](https://nodejs.org)

A simplistic reader of INI files for NodeJS.

It takes a file path as input, and returns a JSON object as the output, synchronously.

It supports sections, with aliases, but without nesting.

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
        return parseInt(value); // convert the number
    }
    return value; // else return the value
});
```
