var express = require('express');
var authRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');
// var nodemailer = require("nodemailer");
const crypto = require('crypto');

const LocalStrategy  = require('passport-local').Strategy;
const session        = require("express-session");

const User = require('../models/user');

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

// Get Login page
authRouter.get('/login', ensureLoggedOut('/'), function(req, res, next) {
  res.render('auth/login');
});

// Post Log-In request
authRouter.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    // authRoutes.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// Log-out
authRouter.get('/logout', ensureLoggedIn('/login'), function (req, res) {
    req.logout();
    res.redirect('login');
});

// Get Signup page
authRouter.get('/signup', function(req, res, next) {
    res.render('auth/signup');
});

// User Sign-up
authRouter.post('/signup', (req, res, next) => {
// authRouter.post('/signup', ensureLoggedIn('/login'), requireRole('admin'), (req, res, next) => {
  console.log(req.body.email);
  const email = req.body.email.toString();
  const password = req.body.password.toString();
  
  //Check if user provided email and password
  if (email === "" || password === "") {
    console.log("Indicate username and password");
    res.render("error", {
        error: "Indicate username and password"
    });
    return;
  }
  //Check if the user already exist in the database (based on email address)
  User.findOne({
    "email": email
  }, async (err, user) => {
      if (err) {
          console.log(err);
      }
      if (user !== null) {
          console.log("The username already exists")
          res.render("auth/signup", {
              msg:{
              "error": "The username already exists"
              }
          });
          return;
      }
      //Generate and store hashed password
      let hashedPassword = generateHashedPassword(password);
      // TODO: Add user activation token
      let randomToken = await crypto.randomBytes(20).toString('hex');
      //Create new user object 
      const newUser = new User({
          email: email,
          password: hashedPassword,
        //   accountActivationToken: randomToken.toString()
      });

      //Save new user to MongoDB
      try {
          await newUser.save();

        } catch (err) {
          console.log(err);
          res.render("error", {
              error: "Something went wrong"
          });
      }
      res.redirect('/');
  });
});

//GENERATE HASHED PASSWORD
function generateHashedPassword(password) {
  let hashPass;
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
}

module.exports = authRouter;