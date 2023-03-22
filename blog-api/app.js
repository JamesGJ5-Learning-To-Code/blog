var express = require('express');
var logger = require('morgan');
const APIRouter = require("./routes");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", APIRouter);

module.exports = app;
