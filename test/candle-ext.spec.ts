import {CandleExt, loadConfig, setEnvironmentVars} from '../src/common';

beforeAll(() => {
    const cfg = loadConfig('dev');
    setEnvironmentVars(cfg);
});

describe('CandleExt', () => {
    const openTime = new Date('Jan 4, 2024');
    const closeTime = new Date('Jan 8, 2024');
    const c = new CandleExt({
        open: 5.1,
        close: 10.07,
        high: 12,
        low: 2,
        volume: 123,
        tradesCount: 1,
        openTime,
        closeTime
    });
    it('must initialize correctly', () => {
        expect(c.open).toEqual(5.1);
        expect(c.close).toEqual(10.07);
        expect(c.high).toEqual(12);
        expect(c.low).toEqual(2);
        expect(c.volume).toEqual(123);
    });
    it('must return correct basic properties', () => {
        expect(c.bodyLen.toFixed(2)).toEqual('4.97');
        expect(c.wickLen.toFixed(2)).toEqual('1.93');
        expect(c.tailLen.toFixed(2)).toEqual('3.10');
        expect(c.isBullish).toEqual(true);
        expect(c.isBearish).toEqual(false);
    });
    it('must return correct extended properties', () => {
        expect(c.midBody.toFixed(2)).toEqual('7.58');
        expect(c.midRange.toFixed(2)).toEqual('7.00');
        expect(c.meanTime.getDate()).toEqual(6);
    });
    it('must calculate umbrella correctly', () => {
        const u1 = new CandleExt({
            open: 4, close: 5, high: .99, low: 1.99, volume: 123,
            tradesCount: 1,
            openTime,
            closeTime
        }); // bullish umbrella
        const u2 = new CandleExt({
            open: 5, close: 4, high: .99, low: 1.99, volume: 123,
            tradesCount: 1,
            openTime,
            closeTime
        }); // bearish umbrella
        expect(c.isUmbrella).toEqual(false);
        expect(u1.isUmbrella).toEqual(true);
        expect(u2.isUmbrella).toEqual(true);
    });
    /*
    it('must throw on invalid data', () => {
        expect(() => {
            new CandleExt(null);
        }).toThrow('Invalid candle data: null');
        expect(() => {
            new CandleExt(<Candle>{open: 123});
        }).toThrow('Value for "high" is missing.');
    });*/
});
