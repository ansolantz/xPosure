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
    .then((dbMedia) => {
      // console.log(dbMedia);

      let isLiked = false;
      let isEditable = false;

      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          isLiked = dbUser.likes.includes(mediaId);
          console.log('USER ID: ', dbUser._id);
          console.log('CREATOR ID', dbMedia.creatorId);
          if (dbUser._id.toString() === dbMedia.creatorId.toString()) {
            isEditable = true;
          }

          res.render('photoview', { dbMedia, dbUser, user: req.user, isLiked, isEditable });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get('/', ensureAuthenticated, (req, res) => {
  Media.find({})
    .then((allTheMediaFromDB) => {
      res.render('exploreview', { allTheMediaFromDB, user: req.user });
    })
    .catch((err) => console.log(err));
});

router.patch('/toggleLike/:mediaId', ensureAuthenticated, (req, res) => {
  console.log('Toggle Like page');
  const { mediaId } = req.params;
  const { username } = req.user;
  User.findOne({ username })
    .then((dbUser) => {
      // console.log('USER NAME', username);
      // console.log('USER ID', dbUser.id);
      // console.log('MEDIA ID ', mediaId);

      if (dbUser.likes.includes(mediaId)) {
        console.log('DELETE MEDIAID');
        let deletePos = dbUser.likes.indexOf(mediaId);
        dbUser.likes.splice(deletePos, 1);

        Media.updateOne({ _id: mediaId }, { $pull: { likes: { $in: [ dbUser.id ] } } }, { multi: true })

          .then((media) => {
            console.log('MediaId Deleted from media');
            res.sendStatus(200);
          })
          .catch((err) => console.log(err));
      } else {
        dbUser.likes.push(mediaId);

        Media.findOneAndUpdate({ _id: mediaId }, { $set: { likes: [dbUser.id] } })

          .then((media) => {
            console.log('Media uppdated');
            res.sendStatus(200);
          })
          .catch((err) => console.log(err));
      }
      dbUser.save();
    })
    .catch((err) => console.log(err));
});

module.exports = router;
