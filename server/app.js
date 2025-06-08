require('dotenv').config()
const express = require('express');
const knex = require('./database/connection.js');

const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', todoRoutes);

app.close = async () => {
  await knex.destroy();
}

module.exports = app;
