let faker = require('faker');
import {parseDateIfValid, parseDateToString} from '../utils/parser'

let randomValidFutureDate = faker.date.future();
let randomValidPastDate = faker.date.past();
let pastDate = new Date('2018-11-23T00:44:02.130Z');
let futureDate = new Date('2034-06-29T00:44:02.130Z');

describe('parseDate check', () => {
    it('recognizes valid future date', () => {
        console.log(randomValidPastDate);
        expect(parseDateIfValid(randomValidFutureDate)).toBe(randomValidFutureDate);
    });
    it('recognizes valid past date', () => {
        expect(parseDateIfValid(randomValidPastDate)).toBe(randomValidPastDate);
    });
    it('recognizes null as invalid date', () => {
        expect(parseDateIfValid(null)).toBe(null);
    });
    // it('recognizes invalid date', () => {
    //     expect(parseDateIfValid(new Date('2019-0-30T03:46:17.579Z'))).toBe(new Date(NaN));
    // });  
});

describe('parseDate to String check', () => {
    it('returns a date string related to past timestamp', () => {
        expect(parseDateToString(pastDate)).toBe('11/23/2018');
    });
    it('returns a date string related to future timestamp', () => {
        expect(parseDateToString(futureDate)).toBe('6/29/2034');
    });
    it('recognizes null as invalid date', () => {
        expect(parseDateToString(null)).toBe('');
    });
    it('recognizes invalid date', () => {
        expect(parseDateToString(new Date('2019-0-30T03:46:17.579Z'))).toBe('NaN/NaN/NaN');
    });
});