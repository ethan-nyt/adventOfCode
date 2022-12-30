const { daySeven } = require('../input');

const threshold = 100000;

// find the sum of sizes of all directories where each directory is under the size threshold.

function Directory(name, parentDirectory) {
    this.Name = name;
    this.Children = [];
    this.ParentDirectory = parentDirectory;
    this.addChild = function(child) {
        this.Children.push(child);
    }
    this.getNumberOfChildren = function() {
        return this.Children.length;
    }
    this.isDirectory = function() {
        return true;
    }
    this.getName = function() {
        return this.Name;
    }
    this.getSize = function() {
        // depth first search of this.children, tallying up the sum as you go
        let sum = 0;
        this.Children.forEach(child => {
            console.log('checking child:', child);
            if (child.isDirectory()) {
                sum += child.getSize()
            } else {
                sum += child.getSize();
            }
        });
        return sum;
    }
    this.getParentDirectory = function() {
        return this.ParentDirectory;
    }
}

function File (name, parentDirectory, size) {
    this.Name = name;
    this.Size = size;
    this.ParentDirectory = parentDirectory;
    this.getSize = function() {
        return this.Size;
    }
    this.getName = function() {
        return this.Name;
    }
    this.isDirectory = function() {
        return false;
    }
    this.getParentDirectory = function() {
        return this.ParentDirectory;
    }
}

const isLs = line => line.split(' ')[1] === 'ls';

const isCd = line => line.split(' ')[1] === '';

const isDir = line => line.split(' ')[0] === 'dir';
const isFile = line => Number.isNaN(parseInt(line.split(' ')[0], 10)) === false;
const isCommand = str => str[0] === '$';

const makeFile = (str, workingDirectory) => {
    const [size, name] = str.split(' ');
    return new File(name, workingDirectory, parseInt(size, 10))
};

const makeDirectory = (str, workingDirectory) => {
    const [, name] = str.split(' ');
    return new Directory(name, workingDirectory);
}

const constructFileSystem = () => {
    const lines = daySeven.split('\n');
    const root = new Directory('/');
    let curr = root;
    lines.slice(1).forEach(line => {
        if (!isCommand(line)) {
            if (isDir(line)) {
                const dir = makeDirectory(line, curr);
                curr.addChild(dir);
                return
            }
            if (!isFile(line)) {
                throw new Error('Unexpected input');
            }
            const file = makeFile(line, curr);
            curr.addChild(file);
        }
        if (isLs(line)) {
            // I guess we just skip these?
            return;
        }
        if (isCd(line)) {
            const [, , newWorkingDirectoryName] = line.split(' ');
            for (let i = 0; i < curr.Children.length; i++) {
                const child = curr.Children[i];
                if (child.isDirectory() && child.getName() === newWorkingDirectoryName) {
                    curr = child;
                    return;
                }
            }
        }
    });
    return root;
};


const getAnswer = () => {
    const tree = constructFileSystem(daySeven);
    let sum = 0;
    tree.Children.forEach(child => {
        console.log('child:', child.getName());
        if (child.isDirectory()) {
            console.log('number of children:', child.getNumberOfChildren())
            const size = child.getSize();
            console.log('got size:', size);
            if (size < threshold) {
                sum += size;
            }
        }
    });
    return sum;
}
console.log('total size of all directories under threshold is:', getAnswer());