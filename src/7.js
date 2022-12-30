const { daySeven } = require('../input');

const threshold = 100000;

// find the sum of sizes of all directories where each directory is under the size threshold.

const getFileSize = str => {
   return parseInt(str.split(' ')[0], 10);
};

const isCommand = str => str[0] === '$';

function Directory(name) {
    this.Name = name;
    this.Children = [];
    this.addChild = function(child) {
        this.Children.push(child);
    }
    this.isDirectory = function() {
        return true;
    }
    this.getSize = function() {
        // depth first search of this.children, tallying up the sum as you go
        let sum = 0;
        this.Children.forEach(child => {
            if (child.isDirectory()) {
                sum += child.getSize()
            } else {
                sum += child.getSize();
            }
        });
        return sum;
    }
}

function File (name, size) {
    this.Name = name;
    this.Size = size;
    this.getSize = function() {
        return this.Size;
    }
    this.isDirectory = function() {
        return false;
    }
}

const constructFileSystem = (str) => {
    const lines = daySeven.split('\n');
    const root = new Directory('/');
    lines.slice(1).forEach(line => {

    })
}