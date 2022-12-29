const { dayFive } = require('../input');

const { start, directions } = dayFive;
const partOne = start.slice().map(arr => arr.slice());
const partTwo = start.slice().map(arr => arr.slice());
/**
 * converts string into actionable instructions
 * @param { String } line
 * ex. parseLine("move 1 from 4 to 1") ==> { numCrates: 1, from: 4, to: 1 }
 */
const parseLine = (line) => {
    const parts = line.split(' ');
    const numCrates = parseInt(parts[1], 10);
    const from = parseInt(parts[3], 10);
    const to = parseInt(parts[5], 10);
    return { numCrates, from, to };
}

const moveCrates = ({ numCrates, from, to }) => {
    let count = numCrates;
    while (count > 0) {
        // need to subtract 1 for proper indexing.
        partOne[to - 1].push(partOne[from - 1].pop());
        count--;
    }
}

const instructions = directions.split('\n').map(parseLine);
instructions.forEach(moveCrates);

const getTopOfEachStack = (result) => {
    return result.map(stack => stack[stack.length - 1]).reduce((result, char) => result + char, '');
}
console.log('result:', getTopOfEachStack(partOne));

// ordering is not correct here...
const moveCratesWithNewMachine = ({ numCrates, from, to }) => {
    const startStack = partTwo[from - 1];
    const cratesToMove = startStack.splice(startStack.length - numCrates, numCrates);
    cratesToMove.forEach(crate => {
        partTwo[to - 1].push(crate);
    });
}

instructions.forEach(moveCratesWithNewMachine);
console.log('result part two:', getTopOfEachStack(partTwo));