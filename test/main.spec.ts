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
    it('must process sections', () => {
        const result = readIniFile(`${inputsPath}/complex.ini`, ({key, value}) => {
            if (key === 'DB_PORT') {
                return Number(value);
            }
            return value;
        });
        expect(result).toEqual({
            NODE_ENV: 'test',
            DB_HOST: 'localhost',
            DB_PORT: 123,
            'my-section': {
                'extra.value': '123'
            }
        });
    })
});
