"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../src/common");
beforeAll(function () {
    var cfg = (0, common_1.loadConfig)('dev');
    (0, common_1.setEnvironmentVars)(cfg);
});
describe('autoRound', function () {
    it('must handle 0', function () {
        expect((0, common_1.roundNumber)(0)).toEqual(0);
    });
    it('must throw away excessive fractions', function () {
        expect((0, common_1.roundNumber)(0.1234567)).toEqual(0.12346);
        expect((0, common_1.roundNumber)(1.234567)).toEqual(1.2346);
        expect((0, common_1.roundNumber)(12.34567)).toEqual(12.346);
        expect((0, common_1.roundNumber)(123.4567)).toEqual(123.46);
        expect((0, common_1.roundNumber)(1234.567)).toEqual(1234.6);
        expect((0, common_1.roundNumber)(12345.43)).toEqual(12345);
        expect((0, common_1.roundNumber)(12345.67)).toEqual(12346);
    });
    it('must handle negative numbers', function () {
        expect((0, common_1.roundNumber)(-0.1234567)).toEqual(-0.12346);
        expect((0, common_1.roundNumber)(-1.234567)).toEqual(-1.2346);
        expect((0, common_1.roundNumber)(-12.34567)).toEqual(-12.346);
        expect((0, common_1.roundNumber)(-123.4567)).toEqual(-123.46);
        expect((0, common_1.roundNumber)(-1234.567)).toEqual(-1234.6);
        expect((0, common_1.roundNumber)(-12345.43)).toEqual(-12345);
        expect((0, common_1.roundNumber)(-12345.67)).toEqual(-12346);
    });
});
