/*jshint esversion: 8*/
const express = require('express');
const app = express();

app.use('/persona', require('./persona/usuario'));
app.use('/curso', require('./persona/usuario'));


module.exports = app;