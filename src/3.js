const { dayThree } = require('../input');

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const priorityMap = alpha.split('').reduce((result, char, i) => {
    return {
        ...result,
        [char]: i + 1,
    }
}, {});

const findCommonChar = (a, b) => {
    const charMap = b.split('').reduce((result, char) => {
        return {
            ...result,
            [char]: true
        }
    }, {});
    for (let i = 0; i < a.length; i++) {
        if (charMap[a[i]]) return a[i];
    }
    throw new Error('no common character found between ' + a + ' and ' + b);
}

const prioritySum = dayThree.split('\n').reduce((sum, line) => {
    const splitIdx = line.length / 2;
    const a = line.slice(0, splitIdx);
    const b = line.slice(splitIdx);
    return sum + priorityMap[findCommonChar(a, b)];
}, 0);

console.log('the priority sum is:', prioritySum);

const findCommonGroupChar = (a, b, c) => {
    const reducer = (map, char) => {
        return {
            ...map,
            [char]: true
        }
    };
    const mapA = a.split('').reduce(reducer, {});
    const mapB = b.split('').reduce(reducer, {});
    for (let i = 0; i < c.length; i++) {
        const char = c[i];
        if (mapA[char] && mapB[char]) return char;
    }
    throw new Error('No common char found between ' + a + ', ' + b + ', and ' + c);
}

let group = [];
let prioritySumOfGroups = 0;
dayThree.split('\n').forEach((line, i) => {
    if (i < 2 || i % 3 !== 0) {
        group.push(line);
        return;
    }
    const commonChar = findCommonGroupChar(group[0], group[1], group[2]);
    prioritySumOfGroups += priorityMap[commonChar];
    group = [line];
});

// need to add the remaining items in the group
console.log('the priority sum of groups of three is:', prioritySumOfGroups + priorityMap[findCommonGroupChar(group[0], group[1], group[2])]);
