'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('./../config/passport-config');
const InstagramStrategy = require('./../config/passport-instagram-strategy');
passport.use(InstagramStrategy);
const User = require('./../models/users');

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
  (req, res, next) => {
    const { username, displayName, homePage, image, bio, media } = req.user;
    console.log(req.user);

    // Query the users collection and to check username and password
    User.findOne({ username })
      .then((user) => {
        // > if `username` already exists in the DB, redirect the user to their profile page
        if (user !== null) {
          res.redirect(`/${username}`);
        }

        axios.get(media)
          .then((response) => {
            // console.log('response', response);
            const data = response.data.data;
            let user = req.user;
            user.images = data.map(img => img.images);
            let imageIds = data.map(img => img.id); // Image IDs
            console.log('user images', user.images);
            // console.log('imageIds', imageIds);
          });

        // > create new user and save their info to DB then redirect to their profile page
        User.create({ username, displayName, homePage, image, bio })
          .then(() => res.redirect(`/${username}`))
          .catch((err) => console.log(err));

      // catch errors from User.findOne
      }).catch((err) => next(err));

    res.redirect(`/${req.user.username}`);
  }
);

module.exports = router;
