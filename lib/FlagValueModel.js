const FlagValueModel = function FlagValueModel(flagAndValue) {
    /**
     *
     *
     * -e|--entry    Entry point, can be file or directory. If empty, assumes current working directory
     * -o|--outDir      Directory result json file is written to
     */
    this._FLAGS = {
        entry: {
            // alias: 'e',
            name: 'entry',
            description: 'Entry point, can be file or directory. If empty, assumes current working directory'
        },
        outDir: {
            // alias: 'o',
            name: 'outDir',
            description: 'Directory output json file will be written to'
        },
    };

    this._longFlagsAndAliases = []
    this.flag = '';
    this.value = '';
    this.isValid = false;

    return this._init(flagAndValue);
};

FlagValueModel.prototype._init = function _init(flagAndValue) {
    const flag = flagAndValue[0];
    const value = flagAndValue[1];
    const longFlags = Object.keys(this._FLAGS);
    const aliases = longFlags.map((flag) => this._FLAGS[flag].alias);

    this._longFlagsAndAliases = longFlags.concat(aliases);
    this.flag = this._setFlagFromNameOrAlias(flag);
    this.isValid = this._isValidFlag();
    this.value = value;

    return this;
};

FlagValueModel.prototype._setFlagFromNameOrAlias = function _setFlagFromNameOrAlias(nameOrAlias) {
    let flag = this._stripLeadingDashes(nameOrAlias);

    if (typeof this._FLAGS[flag] !== 'undefined') {
        return flag;
    }

    return flag;
};

FlagValueModel.prototype._stripLeadingDashes = function _stripLeadingDashes(flag) {
    if (flag.indexOf('--') !== -1) {
        return flag.replace('--', '');
    }

    return flag.replace('-', '');
};

FlagValueModel.prototype._isValidFlag = function _isValidFlag() {
    return this._longFlagsAndAliases.indexOf(this.flag) !== -1;
};

module.exports = FlagValueModel;
