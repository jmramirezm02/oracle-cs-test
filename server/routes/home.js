'use strict';

module.exports = (app, config) => {
    app.get('*', (req, res) => {
        res.sendFile(config.rootPath + 'public/index.html');
    });
};