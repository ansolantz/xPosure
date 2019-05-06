'use strict';

const passport = require('passport');
const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  User.findOne({ username: obj.username })
    .then((userObj) => {
      done(null, userObj);
    })
    .catch((err) => done('Issue deserialising user', err));
});

module.exports = passport;
