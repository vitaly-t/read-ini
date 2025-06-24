import {parseIniFile} from '../src';

const inputsPath = './test/inputs';

describe('parseIniFile', () => {
    it('must read global values', () => {
        const result = parseIniFile(`${inputsPath}/simple.ini`);
        expect(result).toEqual({
            GREETING: 'Hello World!',
            VALUE: '123'
        });
    });
});
