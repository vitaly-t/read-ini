import {readIniFile} from '../src';

const inputsPath = './test/inputs';

describe('readIniFile', () => {
    it('must read global values', () => {
        const result = readIniFile(`${inputsPath}/simple.ini`);
        expect(result).toEqual({
            GREETING: 'Hello World!',
            VALUE: '123'
        });
    });
});
