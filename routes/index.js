'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const parser = require('./../config/multer');
const cloudinaryConfig = require('./../config/cloudinary-config');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');

const User = require('./../models/users');
const Media = require('./../models/media');

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
  res.render('home', { user: req.user, page: 'home' });
});

/* POST /login */
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    const { username } = req.user;

    // Query the users collection and to check username and password
    User.findOne({ username })
      .then((user) => {
      // > if `username` already exists in the DB, redirect the user to their profile page
        if (user !== null) {
          res.redirect(`/${username}`);
        }
      });
  }
);

/* GET /signup */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// POST  '/signup'
router.post('/signup', (req, res, next) => {
  const { displayName, username, password } = req.body;

  if (displayName === '' && username === '' && password === '') {
    res.render('signup', { message: 'Enter a display name, username and password' });
    return;
  } else if (displayName === '') {
    res.render('signup', { message: 'Enter a display name' });
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

      User.create({ displayName, username, passwordHash: hashPass })
        .then(() => res.redirect(`/`))
        .catch((err) => res.render('signup', err, { message: 'Oops, something went wrong. Please try again.' }));
    })
    .catch(error => next(error));
});

/* GET /logout */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout();
  });
  res.redirect('/');
});

router.get('/upload', ensureAuthenticated, (req, res) => {
  let user = req.user;
  res.render('upload', { user, title: 'Upload a photo' });
});

router.post('/upload', parser.single('image'), (req, res) => {
  let standardResolutionImageUrl = '';
  let standardResolutionCloudId = '';
  let thumbnailImageUrl = '';
  let thumbnailCloudId = '';
  let user = req.user;

  if (req.file) {
    standardResolutionImageUrl = req.file.secure_url;
    standardResolutionCloudId = req.file.public_id;
    cloudinary.uploader.upload(standardResolutionImageUrl,
      { folder: 'xposure', image_metadata: true, width: 300, height: 300, crop: 'thumb' },
      (error, result) => {
        if (error) {
          console.log('Issue uploading files to Cloudinary', error);
        } else {
          thumbnailCloudId = result.public_id;
          thumbnailImageUrl = result.secure_url;
          User.findOne({ username: user.username })
            .then((dbUser) => {
              Media.create({ standard_resolution: standardResolutionImageUrl, cloudId: standardResolutionCloudId, thumbnail: thumbnailImageUrl, thumbnail_cloudId: thumbnailCloudId, creatorId: dbUser._id })
                .then(() => res.redirect(`/${dbUser.username}/`));
            })
            .catch((error) => console.log('Error finding authenticated user', error));
        }
      });
  }
});

/* GET /:username */
router.get('/:username', (req, res) => {
  const { username } = req.params;
  User.findOne({ username })
    .then((dbUser) => {
      Media.find({ creatorId: dbUser._id }).sort({ timestamps: -1 })
        .then((mediaByUser) => {
          res.render('mymedia', { mediaByUser, dbUser, user: req.user, title: `${dbUser.username}` });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/* GET /:username/favorites */
router.get('/:username/favorites', (req, res) => {
  const { username } = req.user;
  User.findOne({ username })
    .then((dbUser) => {
      Media.find({ _id: { $in: dbUser.likes } }).sort({ timestamps: -1 })
        .then((mediaFavorites) => {
          res.render('favorites', { mediaFavorites, dbUser, user: req.user, title: 'Favorites' });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
