const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const modules = require('./src/modules');
global.Mongoose = require('mongoose');

const port = 5000;
const app = express();

global.Mongoose.connect(config.getDbConnectionString());

app.use(bodyParser.json());

modules(app);
app.listen(port);
