const path = require('path');
const paperwork = require('precinct').paperwork;
const uuidv4 = require('uuid/v4');

let _id = 0;

/**
 *
 * @param {string} filename
 */
const Node = function Node(filename, parentDir, parentId) {
    this._id = (_id)++;

    this.children = {};
    this.filename = '';
    this.id = '';
    this.isComplete = false;
    this.parentDir = '';
    this.parentId = '';
    this._pathToFile = '';

    return this._init(filename, parentDir, parentId);
};

Node.prototype._init = function _init(filename, parentDir, parentId) {
    this.filename = filename;
    this.id = uuidv4();
    this.parentId = parentId;
    this.parentDir = parentDir;

    this._pathToFile = this._buildFullPathToFile();

    return this._buildDependencyTree();
};

Node.prototype._addChild = function _addChild(childToAdd) {
    if (childToAdd[0] !== '.') {
        console.log('This looks like an external package:', childToAdd);

        return;
    }

    const childPath = `${path.join(this.parentDir, childToAdd)}.js`;
    const childDirname = path.dirname(childPath);
    const childFilename = path.basename(childPath);
    const childNode = new Node(childFilename, childDirname, this.id);
    this.children[childNode.id] = childNode;
}

Node.prototype._buildDependencyTree = function _buildDependencyTree() {
    const dependencies = paperwork(this._pathToFile);

    for (let i = 0; i < dependencies.length; i++) {
        const childNode = dependencies[i];

        this._addChild(childNode);
    }

    return this;
};

Node.prototype._buildFullPathToFile = function _buildFullPathToFile() {
    return path.join(this.parentDir, path.basename(this.filename));
};

module.exports = Node;
