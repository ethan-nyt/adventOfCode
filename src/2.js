const { dayTwo } = require('../input');

const opponentMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
};

const myMap = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
};

const scoreMap = {
    rock: 1,
    paper: 2,
    scissors: 3,
    loss: 0,
    draw: 3,
    win: 6
};

const getRoundResult = (opponent, me) => {
    if (opponent === me) return 'draw';
    let win = false;
    if (me === 'rock') {
        win = opponent === 'scissors'
    }
    if (me === 'paper') {
        win = opponent === 'rock'
    }
    if (me === 'scissors') {
        win = opponent === 'paper'
    }
    return win ? 'win' : 'loss';
}

const getScoreForSingleRound = (opponent, me) => {
    const myShapeScore = scoreMap[me];
    const result = getRoundResult(opponent, me);
    return myShapeScore + scoreMap[result];
};

const totalScore = dayTwo.split('\n').reduce((sum, line) => {
    const [opponent, me] = line.split(' ');
    return sum + getScoreForSingleRound(opponentMap[opponent], myMap[me]);
}, 0);

console.log('total score is ', totalScore);

const neededResultMap = {
    X: 'loss',
    Y: 'draw',
    Z: 'win',
    // if my opponent plays rock, what do I need to play for each outcome
    rock: {
        loss: 'scissors',
        draw: 'rock',
        win: 'paper'
    },
    paper: {
        loss: 'rock',
        draw: 'paper',
        win: 'scissors',
    },
    scissors: {
        loss: 'paper',
        draw: 'scissors',
        win: 'rock'
    }
};

const totalAccurateScore = dayTwo.split('\n').reduce((sum, line) => {
    const [opponent, neededResult] = line.split(' ');
    const opponentPlay = opponentMap[opponent];
    const desiredOutcome = neededResultMap[neededResult];
    const myPlay = neededResultMap[opponentPlay][desiredOutcome];
    return sum + scoreMap[myPlay] + scoreMap[desiredOutcome];
}, 0);

console.log('the total accurate score is', totalAccurateScore);