/*jshint esversion: 8*/
const express = require('express');
const app = express();

app.use('/persona', require('./persona/usuario'));
app.use('/curso', require('./courses/curso'));
app.use('/userCourses', require('./userCourses/usuarioCurso'));


module.exports = app;