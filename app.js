'use strict';

const express = require('express'),
    dotenv = require('dotenv').config();
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const config = require('./server/config/configuration')[env];
require('./server/config/express')(app, config);

require('./server/routes/notes')(app, config);
require('./server/routes/home')(app, config);

app.listen(config.port, function () {
    console.log('Gulp is running the API on PORT: ' + config.port);
});