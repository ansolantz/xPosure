'use strict';

const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const User = require('./../models/users');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

router.get('/:mediaId', ensureAuthenticated, (req, res) => {
  const { mediaId } = req.params;

  Media.findById(mediaId)
    .then((photo) => {
      console.log(photo);

      let isLiked = false;
      const { username } = req.user;
      User.findOne({ username })
        .then((user) => {
          isLiked = user.likes.includes(mediaId);
          res.render('photoview', { photo, user: req.user, isLiked });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get('/', ensureAuthenticated, (req, res) => {
  Media.find({})
    .then((allTheMediaFromDB) => {
      // console.log('All media:', allTheMediaFromDB);

      res.render('exploreview', { allTheMediaFromDB, user: req.user });
    })
    .catch((err) => console.log(err));
});

router.patch('/toggleLike/:mediaId', ensureAuthenticated, (req, res) => {
  console.log('toggle Like page');
  const { mediaId } = req.params;
  const { username } = req.user;
  User.findOne({ username })
    .then((dbUser) => {
      console.log('USER NAME', username);
      console.log('USER ID', dbUser.id);
      console.log('MEDIA ID ', mediaId);
      dbUser.likes.push(mediaId);
      dbUser.save();

      Media.findOneAndUpdate({ _id: mediaId }, { $set: { likes: [dbUser.id] } })
        // .then((media) => res.redirect('/books'))
        .then((media) => {
          console.log('Media uppdated');
          res.sendStatus(200);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
