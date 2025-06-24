import {loadConfig, roundNumber, setEnvironmentVars} from '../src/common';

beforeAll(() => {
    const cfg = loadConfig('dev');
    setEnvironmentVars(cfg);
});

describe('autoRound', () => {
    it('must handle 0', () => {
        expect(roundNumber(0)).toEqual(0);
    });
    it('must throw away excessive fractions', () => {
        expect(roundNumber(0.1234567)).toEqual(0.12346);
        expect(roundNumber(1.234567)).toEqual(1.2346);
        expect(roundNumber(12.34567)).toEqual(12.346);
        expect(roundNumber(123.4567)).toEqual(123.46);
        expect(roundNumber(1234.567)).toEqual(1234.6);

        expect(roundNumber(12345.43)).toEqual(12345);
        expect(roundNumber(12345.67)).toEqual(12346);
    });

    it('must handle negative numbers', () => {
        expect(roundNumber(-0.1234567)).toEqual(-0.12346);
        expect(roundNumber(-1.234567)).toEqual(-1.2346);
        expect(roundNumber(-12.34567)).toEqual(-12.346);
        expect(roundNumber(-123.4567)).toEqual(-123.46);
        expect(roundNumber(-1234.567)).toEqual(-1234.6);

        expect(roundNumber(-12345.43)).toEqual(-12345);
        expect(roundNumber(-12345.67)).toEqual(-12346);
    });
});
