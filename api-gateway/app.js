/*
===============================================================================
; Title:  app.js
; Author: Professor Krasso
; Date:   5/5/2020
; Modified By: Jeff Shepherd
; Description: app
;==============================================================================
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mongoose = require("mongoose");
const apiCatalog = require("./routes/api-catalog");

//const conn = "mongodb+srv://jshepherd:71VwzVhDGq3DDozG@buwebdev-cluster-1-solm5.mongodb.net/api-gateway";
const conn = "mongodb://localhost:27017/web335";

mongoose.connect(conn, {
  promiseLibrary: require("bluebird"),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug("Connection successful.");
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiCatalog);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
