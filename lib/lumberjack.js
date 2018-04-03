const fs = require('fs');
const path = require('path');
const argumentsParser = require('./argumentsParser');
const Node = require('./Node');

/**
 * Initial default values for all possible app options
 *
 * @property DEFAULT_OPTIONS
 */
const DEFAULT_OPTIONS = {
    /**
     * Directory entry file can be found. Serves as the starting point for tree building
     *
     * @memberof DEFAULT_OPTIONS
     * @property entryDir
     * @private
     */
    entryDir: '',

    /**
     * Entry file. Building a dependency tree starts with this file.
     *
     * Set via `--entry` flag value
     *
     * @memberof DEFAULT_OPTIONS
     * @property entry
     * @public
     */
    entry: '',

    /**
     * Directory where result will be written to a json file
     *
     * Set via `--outDir` flag value
     *
     * @memberof DEFAULT_OPTIONS
     * @property outDir
     * @public
     */
    outDir: '.lumberjack',

    /**
     * Default output file name
     *
     * @memberof DEFAULT_OPTIONS
     * @property outFile
     * @private
     */
    outFile: 'tree.json'
};

/**
 * Final options map after defaults and cli flags have been applied
 *
 * This object will be mutated by the `argumentsParser`
 *
 * @property options
 * @type {Object}
 * @private
 * @mutable
 */
let options = {};

/**
 * Display welcome banner
 *
 * @function _buildWelcomeBanner
 * @private
 */
function _buildWelcomeBanner() {
    console.log('\n----------------------------------------\n');
    console.log(`path to dir:\t ${options.entryDir}`);
    console.log(`path to entry:\t ${options.entry}`);
    console.log('\n----------------------------------------\n');
}

/**
 * Write `Nodes` to `.json` file `options.outFile`
 *
 * @function _generateOutputFile
 * @param {json} lumberjackTree
 * @private
 */
function _generateOutputFile(lumberjackTree) {
    fs.access(options.outFile, (err) => {
        fs.writeFile(options.outFile, lumberjackTree, { flag: 'w' }, (err) => {
            if (err) {
                console.log('+++', err);
            }
        });
    });
}

/**
 * Verify `options.outDir` exists, otherwise create it
 *
 * @function _generateOutputDir
 * @param {json} lumberjackTree
 * @private
 */
function _generateOutputDir(lumberjackTree) {
    fs.access(options.outDir, (err) => {
        if (err && err.code === 'ENOENT') {
            fs.mkdir(options.outDir);
        }

        _generateOutputFile(lumberjackTree);
    });
}

/**
 * Stringify the `rootNode` and initiate the process
 * writing that output to `options.outFile`
 *
 * @function _generateOutput
 * @private
 */
function _generateOutput() {
    const rootNode = new Node(options.entry, options.entryDir, null);
    const lumberjackTree = JSON.stringify(rootNode);

    _generateOutputDir(lumberjackTree);
}
/**
 * Given an entry file, walk through each dependencies and all subsequent
 * child dependencies, building a recursive tree of all app file references
 *
 * @function lumberjack
 * @public
 */
function lumberjack() {
    // create copy of `DEFAULT_OPTIONS` so those defaults don't mutate
    const defaultOptionsCopy = Object.assign({}, DEFAULT_OPTIONS);
    options = argumentsParser(defaultOptionsCopy);

    _buildWelcomeBanner();
    _generateOutput();
}

module.exports = lumberjack();
