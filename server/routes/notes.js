'use strict';

const notesCtrl = require('../controllers/NotesCtrl');

module.exports = (app, config) => {
    app.get('/api/notes', notesCtrl.get);
    app.post('/api/notes', notesCtrl.post);
};