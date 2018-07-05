const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
global.Mongoose = require('mongoose');
const dateFormat = require('dateformat');
const config = require('./config');
const modules = require('./src/modules');

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

app.use(function timeLog (req, res, next){
  console.log(`${dateFormat()} : ${req.method} ${req.url}`);
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use((req, res, next) => {
  if(req.url === `/api/login` || req.url === `/api/signup`) next();
  else if (req.session.user) next();
  else res.status(403).json({message: "Login required."})
})

modules(app);
app.listen(port, console.log(`App is now running.`));
