'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('./../config/cloudinary-config');
const passport = require('./../config/passport-config');
const InstagramStrategy = require('./../config/passport-instagram-strategy');
passport.use(InstagramStrategy);
const User = require('./../models/users');
const Media = require('./../models/media');

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
    // console.log(req.user);

    // Query the users collection and to check username and password
    User.findOne({ username })
      .then((user) => {
        // > if `username` already exists in the DB, redirect the user to their profile page
        if (user !== null) {
          res.redirect(`/${username}`);
          return;
        }

        axios.get(media)
          .then((response) => {
            const data = response.data.data;
            // console.log('data', data);
            let user = req.user;
            user.images = data.map(img => img.images);
            user.images.forEach(image => {
              cloudinary.uploader.upload(image.standard_resolution.url, { folder: 'xposure', image_metadata: true }, (error, result) => {
                if (error) {
                  console.log('Issue uploading files to Cloudinary', error);
                } else {
                  const { secure_url } = result;
                  User.findOne({ username: username })
                    .then((user) => {
                      Media.create({ standard_resolution: secure_url, creatorId: user._id })
                        .then(() => console.log('Media inserted into the DB successfully'))
                        .catch((error) => console.log('Error inserting media into the DB', error));
                    })
                    .catch((error) => console.log('Error finding user', error));
                }
              });
            });
          })
          .catch((err) => console.log('Unable to retrieve media:', err));

        // > create new user and save their info to DB then redirect to their profile page
        User.create({ username, displayName, homePage, image, bio })
          .then(() => res.redirect(`/${username}`))
          .catch((err) => console.log('Issue saving user to database:', err));

      // catch errors from User.findOne
      }).catch((err) => next(err));
  }
);

module.exports = router;
