'use strict';
const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: process.env.DB,
        rootPath: rootPath,
        port: process.env.PORT
    }
};