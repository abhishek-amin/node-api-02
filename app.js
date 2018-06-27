const express = require('express');
const config = require('./config');
const modules = require('./src/modules');

const port = 5000;
const app = express();

global.Mongoose = require('mongoose');

global.Mongoose.connect(config.getDbConnectionString());

modules(app);
app.listen(port);
