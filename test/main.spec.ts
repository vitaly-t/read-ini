import {readIniFile} from '../src';

const inputsFolder = './test/inputs';

describe('readIniFile', () => {
    it('must read global values', () => {
        const result = readIniFile(`${inputsFolder}/simple.ini`);
        expect(result).toEqual({
            GREETING: 'Hello World!',
            VALUE: '123'
        });
    });
    it('must process sections', () => {
        const result = readIniFile(`${inputsFolder}/complex.ini`);
        expect(result['my-section']).toEqual({'extra.value': '567', 'one-more': 'hello'});
    });
    it('must convert values', () => {
        const result = readIniFile(`${inputsFolder}/complex.ini`, ({key, value}) => {
            if (key === 'DB_PORT' || key === 'extra.value') {
                return Number(value);
            }
            return value;
        });
        expect(result.DB_PORT).toEqual(123);
        expect(result['my-section']['extra.value']).toEqual(567);
    });
    it('must handle verbose syntax', () => {
        const result = readIniFile(`${inputsFolder}/verbose.ini`);
        expect(result).toEqual({
            'one.two.three.four': {
                '__first-$': '1'
            },
            '$one-two2-3_4': {
                '$---second-.bla': '2'
            },
            '--__third_$': {
                'third': '3'
            },
            'hello there! :)': {
                fourth: '4'
            }
        });
    });
});
