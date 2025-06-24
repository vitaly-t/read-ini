# read-ini

[![ci](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml/badge.svg)](https://github.com/vitaly-t/read-ini/actions/workflows/ci.yml)
[![Node Version](https://img.shields.io/badge/nodejs-20%20--%2024-green.svg?logo=node.js&style=flat)](https://nodejs.org)

A simplistic reader of INI files for NodeJS.

## Install

```
$ npm i read-ini
```

## Usage

It exposes function `readIniFile`, which takes a file path as input, and returns a JSON object
with all the variables as the output. And it does so synchronously.

The library supports sections, with aliases, but without nesting.

```ts
import {readIniFile} from 'read-ini';

const result = readIniFile('./file.ini');
//=> result is a JSON object with all the variables
```

With value-type conversion:

```ts
const result = readIniFile('./file.ini', ({key, value, section}) => {
    if (key === 'MY_INT_VALUE') {
        return parseInt(value); // convert to number
    }
    return value; // else return the value
});
```
