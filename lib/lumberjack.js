const path = require('path');
const Node = require('./Node');

function printBanner(entryDir, entryPath) {
    console.log('----------------------------------------');
    console.log('lumberJack')
    console.log(`path to dir:\t ${entryDir}`);
    console.log(`path to entry:\t ${entryPath}`);
    console.log('----------------------------------------\n');
}

/**
 *
 */
function lumberjack() {
    const entryDir = path.join(process.cwd(), '_src');
    const entryPath = 'index.js';

    printBanner(entryDir, entryPath);

    const rootNode = new Node(entryPath, entryDir, null);

    console.log('\n------------\n');
}

module.exports = lumberjack();
