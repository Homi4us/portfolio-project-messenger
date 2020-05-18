var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

//all routers
var usersRouter = require('./routes/users');
const uploadRouter = require('./routes/uploadRouter');
var chatRouter = require('./routes/chatRouter');
var gamesRouter = require('./routes/gamesRouter');
//all models


//mongodb connect
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production'){
  app.use(express.static( 'client/build' ));
  
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
  });
}

//all routers for using
app.use('/users', usersRouter);
app.use('/imageUpload',uploadRouter);
app.use('/chat',chatRouter);
app.use('/games', gamesRouter)

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
