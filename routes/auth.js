'use strict';

const express = require('express');
const router = express.Router();
const passport = require('./../config/passport-config');
const InstagramStrategy = require('./../config/passport-instagram-strategy');
passport.use(InstagramStrategy);

// This route shouldn't be called directly
router.get('/auth', (req, res, next) => {
  res.redirect('/');
});

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
router.get('/instagram',
  passport.authenticate('instagram'),
  (req, res) => {
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  }
);

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/mymedia/${req.user.username}`);
  }
);

module.exports = router;
