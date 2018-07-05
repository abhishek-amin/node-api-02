const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');
const modules = require('./src/modules');
global.Mongoose = require('mongoose');

const port = 5000;
const app = express();

global.Mongoose.connect(config.getDbConnectionString());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'hard to guess',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  if(req.url === `/api/login`) next();
  else if (req.session.user) next();
  else res.status(403).json({message: "Login required."})
})

modules(app);
app.listen(port);
