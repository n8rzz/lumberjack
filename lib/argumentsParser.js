const path = require('path');
const FlagValueModel = require('./FlagValueModel');

/**
 * Returns an array with arrays of the given size.
 *
 * @param {array<string>} pristineArgsAndValues  array to split
 */
function _chunkFlagsAndValues(pristineArgsAndValues) {
    const chunkSize = 2;
    const mutableAgsAndValues = pristineArgsAndValues.slice();
    const argWithValue = [];

    while (mutableAgsAndValues.length) {
        argWithValue.push(mutableAgsAndValues.splice(0, chunkSize));
    }

    return argWithValue;
}

/**
 *
 *
 */
function updateOptionsWithFlagValue(options) {
    // find valid flag/value pairs, could still contain duplicate flags
    const argList = _extractArgList();

    for (let i = 0; i < argList.length; i++) {
        const arg = argList[i];

        options[arg.flag] = arg.value;
    }

    return options;
}

/**
 *
 *
 * @function _extractValidFlagValueModelList
 * @param {FlagValueModel[]} flagValueModelList
 * @returns {FlagValueModel[]}
 * @private
 */
function _extractValidFlagValueModelList(flagValueModelList) {
    return flagValueModelList.filter((item) => item.isValid);
}

/**
 * Extract valid flag/value pairs from `process.argv`
 *
 * @function _extractArgList
 * @return {FlagValueModel[]}
 * @private
 */
function _extractArgList() {
    const flagValueModelList = _chunkFlagsAndValues(process.argv.slice(2))
        .map((item) => new FlagValueModel(item));

    return _extractValidFlagValueModelList(flagValueModelList);
}

/**
 *
 * @function argumentParser
 * @argumentsParser
 * @param {object} options
 * @return {object} options
 * @public
 */
function argumentsParser(options) {
    updateOptionsWithFlagValue(options);

    options.entryDir = path.join(process.cwd(), path.dirname(options.entry));
    options.outFile = path.join(process.cwd(), options.outDir, options.outFile);

    return options;
}

module.exports = argumentsParser;
