const path = require('path');
const FlagValueModel = require('./FlagValueModel');

/**
 * Returns an array with arrays of the given size.
 *
 * @param pristineArgsAndValues {array<string>} array to split
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
function updateOptionsWithFlagValue(arg, options) {
    options[arg.flag] = arg.value;
}

/**
 *
 *
 */
function argumentsParser(options) {
    // find valid flag/value pairs, could still contain duplicate flags
    const argList = _chunkFlagsAndValues(process.argv.slice(2))
        .map((item) => new FlagValueModel(item))
        .filter((item) => item.isValid);

    for (let i = 0; i < argList.length; i++) {
        const arg = argList[i];

        updateOptionsWithFlagValue(arg, options);
    }

    // TEMP
    options.entryDir = path.join(process.cwd(), path.dirname(options.entry));
    options.outFile = path.join(process.cwd(), options.out, 'lumberjack.json');

    return options;
}

module.exports = argumentsParser;
