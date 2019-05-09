'use strict';

const express = require('express');
const router = express.Router();
const Media = require('../models/media');
const User = require('./../models/users');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

/* GET /explore/:mediaId */
router.get('/:mediaId', ensureAuthenticated, (req, res) => {
  const { mediaId } = req.params;

  Media.findById(mediaId)
    .then((dbMedia) => {
      let isLiked = false;
      let isEditable = false;

      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          isLiked = dbUser.likes.includes(mediaId);

          if (dbUser._id.toString() === dbMedia.creatorId.toString()) {
            isEditable = true;
          }
          res.render('photoview', { dbMedia, dbUser, user: req.user, isLiked, isEditable, title: 'Photo' });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/* GET /explore/ */
router.get('/', ensureAuthenticated, (req, res) => {
  Media.find({}).sort({ timestamps: -1 })
    .then((allTheMediaFromDB) => {
      res.render('exploreview', { allTheMediaFromDB, user: req.user, title: 'Explore' });
    })
    .catch((err) => console.log(err));
});

/* PATCH /explore/toggleLike/:mediaId */
router.patch('/toggleLike/:mediaId', ensureAuthenticated, (req, res) => {
  const { mediaId } = req.params;
  const { username } = req.user;
  User.findOne({ username })
    .then((dbUser) => {
      if (dbUser.likes.includes(mediaId)) {
        let deletePos = dbUser.likes.indexOf(mediaId);
        dbUser.likes.splice(deletePos, 1);

        Media.updateOne({ _id: mediaId }, { $pull: { likes: { $in: [ dbUser.id ] } } }, { multi: true })
          .then((media) => {
            res.sendStatus(200);
          })
          .catch((err) => console.log(err));
      } else {
        dbUser.likes.push(mediaId);

        Media.findOneAndUpdate({ _id: mediaId }, { $set: { likes: [dbUser.id] } })
          .then((media) => {
            res.sendStatus(200);
          })
          .catch((err) => console.log(err));
      }
      dbUser.save();
    })
    .catch((err) => console.log(err));
});

module.exports = router;
