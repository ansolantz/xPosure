'use strict';

const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const User = require('./../models/users');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

/* GET /manage */

// router.get('/', (req, res, next) => {
//   res.render('mymedia');
// });

router.get('/:mediaId', ensureAuthenticated, (req, res) => {
  console.log('MEDIA EDIT PAGE');
  const { mediaId } = req.params;

  Media.findById(mediaId)
    .then((dbMedia) => {
      // console.log(dbMedia);

      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          res.render('mediaedit', { dbMedia, dbUser, user: req.user });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post('/edit', ensureAuthenticated, (req, res) => {
  console.log('MEDIA EDIT!');

  const { _id } = req.query;
  const { description } = req.body;
  console.log(_id);
  console.log(description);

  let isLiked = false;
  let isEditable = false;

  Media.findOneAndUpdate({ _id }, { $set: { meta: { description } } }, { new: true })
  // Media.findOne({ _id })
    .then((dbMedia) => {
      // console.log('Meta description:', dbMedia.meta.description);
      // dbMedia.meta.description = description;
      // dbMedia.save();
      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          isLiked = dbUser.likes.includes(_id);
          // console.log('USER ID: ', dbUser._id);
          // console.log('CREATOR ID', dbMedia.creatorId);
          if (dbUser._id.toString() === dbMedia.creatorId.toString()) {
            isEditable = true;
          }

          res.render('photoview', { dbMedia, dbUser, user: req.user, isLiked, isEditable });
          // res.render('photoview', { dbMedia, dbUser, user: req.user });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
module.exports = router;
