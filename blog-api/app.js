var express = require('express');
var logger = require('morgan');
const { userRouter, postRouter, commentRouter } = require("./routes");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

module.exports = app;
