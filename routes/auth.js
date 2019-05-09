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
router.get('/', (req, res, next) => {
  res.redirect('/');
});

// GET /auth/instagram
router.get('/instagram',
  passport.authenticate('instagram'),
  (req, res) => { }
);

// GET /auth/instagram/callback
router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res, next) => {
    const { username, displayName, homePage, image, bio, media } = req.user;

    // Query the users collection and to check username and password
    User.findOne({ username })
      .then((user) => {
        // > if `username` already exists in the DB, redirect the user to their profile page
        if (user !== null) {
          res.redirect(`/${user.username}`);
          return;
        }

        // > create new user and save their info to DB then redirect to their profile page
        User.create({ username, displayName, homePage, image, bio })
          .then(() => {
            axios.get(media)
              .then((response) => {
                const data = response.data.data;
                let user = req.user;
                user.images = data.map(img => img.images);
                user.images.forEach((image, index) => {
                  cloudinary.uploader.upload(image.standard_resolution.url, { folder: 'xposure', image_metadata: true }, (error, result) => {
                    if (error) {
                      console.log('Issue uploading files to Cloudinary', error);
                    } else {
                      let standardResolutionImageUrl = result.secure_url;
                      let standardResolutionCloudId = result.public_id;
                      cloudinary.uploader.upload(image.standard_resolution.url, { folder: 'xposure', width: 300, height: 300, crop: 'thumb' }, (error, result) => {
                        if (error) {
                          console.log('Issue uploading files to Cloudinary', error);
                        } else {
                          let thumbnailImageUrl = result.secure_url;
                          let thumbnailCloudId = result.public_id;
                          User.findOne({ username: username })
                            .then((dbuser) => {
                              Media.create({ standard_resolution: standardResolutionImageUrl, cloudId: standardResolutionCloudId, thumbnail: thumbnailImageUrl, thumbnail_cloudId: thumbnailCloudId, creatorId: dbuser._id })
                                .then(() => {})
                                .catch((error) => console.log('Error inserting media into the DB', error));
                            })
                            .catch((error) => console.log('Error finding user', error));
                        }
                      });
                    }
                  });
                });
              })
              .catch((err) => console.log('Unable to retrieve media:', err));
          })
          .then(() => res.redirect(`/${username}`))
          .catch((err) => console.log('Issue saving user to database:', err));

        // catch errors from User.findOne
      }).catch((err) => next(err));
  }
);

module.exports = router;
