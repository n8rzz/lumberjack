const fs = require('fs');
const path = require('path');
const argumentsParser = require('./argumentsParser');
const Node = require('./Node');

const DEFAULT_OPTIONS = {
    entryDir: '',
    entry: '',
    out: '.lumberjack',
    outFile: 'tree.json'
};

/**
 *
 *
 */
function printBanner(entryDir, entryPath) {
    console.log('\n----------------------------------------\n');
    console.log(`path to dir:\t ${entryDir}`);
    console.log(`path to entry:\t ${entryPath}`);
    console.log('\n----------------------------------------\n');
}

/**
 *
 *
 */
function generateOutput(rootNode, options) {
    const lumberjackTree = JSON.stringify(rootNode);

    // TODO: check if output dir exists first
    fs.writeFile(options.outFile, lumberjackTree, (err) => {
        if (err) {
            console.log(err);
        }

        console.log('\n------------\n');
    });
}
/**
 *
 *
 */
function lumberjack() {
    const options = Object.assign({}, DEFAULT_OPTIONS, argumentsParser(DEFAULT_OPTIONS));

    printBanner(options.entryDir, options.entry);

    const rootNode = new Node(options.entry, options.entryDir, null);

    generateOutput(rootNode, options);

}

module.exports = lumberjack();
