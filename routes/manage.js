'use strict';

const express = require('express');
const router = express.Router();
const User = require('./../models/users');
const Media = require('./../models/media');

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

/* GET /manage/profile */

router.get('/profile', ensureAuthenticated, (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => res.render('profile', { user }))
    .catch((error) => console.log('Error retrieving user profile from DB', error));
});

/* POST /manage/profile */

router.post('/profile', (req, res, next) => {
  const { _id } = req.user;
  const { bio, homePage, displayName } = req.body;

  User.findOneAndUpdate({ _id }, { $set: { bio, homePage, displayName } })
    .then((user) => res.redirect(`/${user.username}`))
    .catch((error) => console.log('Error updating user profile to DB', error));
});

/* POST /manage/delete/:userId */

router.post('/delete', ensureAuthenticated, (req, res, next) => {
  const { _id } = req.body;
  User.deleteOne({ _id })
    .then(() => {
      Media.deleteMany({ creatorId: _id })
        .then(() => res.redirect('/logout'))
        .catch(() => console.log('Unable to delete user\'s media'));
    })
    .catch((error) => console.log('Unable to delete user account', error));
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
