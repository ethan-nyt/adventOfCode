const { daySix } = require('../input');

const isStartOfPacketMarker = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
            if (i === j) continue;
            if (arr[i] === arr[j]) return false;
        }
    }
    return true;
}

const findFirstStartOfPacketMarker = (str, markerLength = 4) => {
    const seen = [];
    for (let i = 0; i < str.length; i++) {
        const curr = str[i];
        if (seen.length < markerLength) {
            seen.push(curr);
            continue;
        }
        if (isStartOfPacketMarker(seen)) {
            // we're using indices starting at 1, but since the previous char added was at index i - 1, we don't need i + 1 here.
            return i;
        } else {
            seen.push(curr);
            seen.shift();
        }
    }
    throw new Error('No packet found');
}

console.log('first packet found after processing', findFirstStartOfPacketMarker(daySix), ' characters.');
console.log('first message found after processing', findFirstStartOfPacketMarker(daySix, 14), ' characters');