'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET / */
router.get('/', (req, res, next) => {
  res.render('home', { user: req.user });
});

/* GET /:username */

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

router.get('/:username', ensureAuthenticated, (req, res) => {
  // console.log(req.user.media);
  axios.get(req.user.media)
    .then((response) => {
      // console.log('response', response);
      const data = response.data.data;
      let user = req.user;
      user.images = data.map(img => img.images);
      let imageIds = data.map(img => img.id); // Image IDs
      console.log('imageIds', imageIds);
      res.render('mymedia', { user });
    });
});

/* GET /login */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* GET /signup */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

/* GET /logout */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('session destroyed');
  });
  req.logout();
  res.redirect('/');
});

module.exports = router;
