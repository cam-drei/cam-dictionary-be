require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const logger = require('morgan');

const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const session = require("express-session");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import any mongodb models
const User = require("./models/user");
const Workout = require("./models/workout");
  
var app = express();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => {
    console.log(err); /** handle initial connection error */
  }
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);

//session config
app.use(session({ 
  secret: "puma wolf",
  resave: true,
  saveUninitialized: true 
}));

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

// Authenticate user via passport
passport.use('local-login', new LocalStrategy({
  passReqToCallback : true,
  usernameField: 'email'
}, 
function (req, email, password, next) {
  User.findOne({
    email: email
  }, function (err, user) {
      console.log(err)
      if (err) {
        console.log("There was an error")
        return next(err);
      }
      if (!user) {
        console.log("User does not exist")
        // return next(null, false, {
          res.render("auth/login", {
            msg:{
              "error": 'You have enterred either an incorrect email or an incorrect password'
            }
          });
          return;
        // });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "Incorrect password"
        });
      }
      return next(null, user);
    });
  }
));


module.exports = app;
