'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('./../models/users');
const Media = require('./../models/media');
const parser = require('./../config/multer');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

/* GET / */
router.get('/', (req, res, next) => {
  res.render('home', { user: req.user });
});

/* GET /login */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* GET /signup */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// POST  '/signup'
router.post('/signup', ensureAuthenticated, (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' && password === '') {
    res.render('signup', { message: 'Enter a username and password' });
    return;
  } else if (username === '') {
    res.render('signup', { message: 'Enter a username' });
    return;
  } else if (password === '') {
    res.render('signup', { message: 'Enter a password' });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('signup', { message: 'Sorry, the username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({ username, passwordHash: hashPass });

      newUser.save((err) => {
        if (err) res.render('signup', { message: 'Oops, something went wrong. Please try again.' });
        else res.redirect('/', { message: username });
      });
    })
    .catch(error => next(error));
});

/* GET /logout */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('session destroyed');
  });
  req.logout();
  res.redirect('/');
});

/* GET /:username */

router.get('/:username', ensureAuthenticated, (req, res) => {
  // console.log(req.user.media);
  axios.get(req.user.media)
    .then((response) => {
      // console.log('response', response);
      const data = response.data.data;
      let user = req.user;
      user.images = data.map(img => img.images);
      let imageIds = data.map(img => img.id); // Image IDs
      // console.log('imageIds', imageIds);
      res.render('mymedia', { user });
    })
    .catch((err) => console.log('Unable to retrieve media', err));
});

router.get('/:username/upload', ensureAuthenticated, (req, res) => {
  let user = req.user;
  res.render('upload', { user });
});

router.post('/:username/upload', parser.single('image'), (req, res) => {
  let imageUrl = '';
  let user = req.user;

  if (req.file) {
    imageUrl = req.file.secure_url;
  }

  User.findOne({ username: user.username })
    .then((dbUser) => {
      Media.create({ standard_resolution: imageUrl, creatorId: dbUser._id })
        .then(() => res.redirect(`/${dbUser.username}/`));
    })
    .catch((error) => console.log('Error finding authenticated user', error));
});

module.exports = router;
