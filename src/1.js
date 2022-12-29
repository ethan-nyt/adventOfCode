const { dayOne } = require('../input');

const lines = dayOne.split('\n');
let temp = 0;
const max = lines.reduce((result, line) => {
    if (line !== '') {
        temp += parseInt(line, 10);
    } else {
        const curr = temp;
        temp = 0;
        if (curr > result) {
            return curr;
        }
    }
    return result;
}, 0);
console.log('the elf carrying the most is carrying ', max, ' calories.');

temp = 0;
const topThree = lines.reduce((result, line) => {
    if (line !== '') {
        temp += parseInt(line, 10);
    } else {
        const curr = temp;
        temp = 0;

        for (let i = 0; i < 3; i++) {
            if (result[i] === -1) {
                result[i] = curr;
                return result;
            }
        }

        if (curr > result[0]) {
            result[0] = curr;
        } else if (curr > result[1]) {
            result[1] = curr;
        } else if (curr > result[2]) {
            result[2] = curr;
        }
    }
    return result.sort();
}, [-1, -1, -1]);
console.log('the top three elves are carrying ', topThree[0] + topThree[1] + topThree[2], ' calories in total.');