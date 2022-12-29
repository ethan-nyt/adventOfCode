const { dayFour } = require('../input');


/**
 * Returns whether the range "a" is included in the range "b", or vice a versa.
 * @param { String } a the first range
 * @param { String } b the second range
 * ex. doesRangeContainOtherRange("1-2", "0-3") ==> true
 * ex. doesRangeContainOtherRange("10-11", "100-1000") ==> false
 */
const doesRangeContainOtherRange = (a, b) => {
    // ranges overlap if and only if:
        // the lower bound of a is greater than or equal to the lower bound of b
        // AND
        // the upper bound of a is less than or equal to the upper bound of b
        // OR
        // the lower bound of b is greater than or equal to the lower bound of a
        // AND
        // the upper bound of b is less than or equal to the upper bound of a
    let [lowerA, upperA] = a.split('-');
    let [lowerB, upperB] = b.split('-');
    [lowerA, upperA, lowerB, upperB] = [lowerA, upperA, lowerB, upperB].map(str => parseInt(str, 10));
    return (lowerA >= lowerB && upperA <= upperB) || (lowerB >= lowerA && upperB <= upperA);
}

const rangeContainCount = dayFour.split('\n').filter(line => {
    const [a, b] = line.split(',');
    return doesRangeContainOtherRange(a, b);
}).length;

console.log('the number of assignments with completely overlapping ranges is:', rangeContainCount);

const doRangesOverlap = (a, b) => {
    let [lowerA, upperA] = a.split('-');
    let [lowerB, upperB] = b.split('-');
    [lowerA, upperA, lowerB, upperB] = [lowerA, upperA, lowerB, upperB].map(str => parseInt(str, 10));
    // ranges overlap if any of the bounds are included in the other range
    return (lowerA >= lowerB && lowerA <= upperB) || (upperA <= upperB && upperA >= lowerB) || (lowerB >= lowerA && lowerB <= upperA) || (upperB <= upperA && upperB >= lowerA)
}

const rangeOverlapCount = dayFour.split('\n').filter(line => {
    const [a, b] = line.split(',');
    return doRangesOverlap(a, b);
}).length;

console.log('the number of assignments with overlapping ranges is:', rangeOverlapCount);