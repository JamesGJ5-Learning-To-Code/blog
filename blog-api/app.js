require('dotenv').config();
const mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
const APIRouter = require("./routes/apiRouter");

main().catch(console.log);
async function main() {
    await mongoose.connect(process.env.DEV_CONNECTION_STRING);
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", APIRouter);

module.exports = app;
