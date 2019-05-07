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

router.get('/', (req, res, next) => {
  res.render('mymedia');
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
    .then((user) => console.log('Deleted account for ', user._id))
    .then((user) => {
      Media.deleteMany({ creatorId: _id })
        .then(() => console.log(user.username, '\'s media has been deleted'))
        .catch(() => console.log('Unable to delete user\'s media'));
    })
    .catch((error) => console.log('Unable to delete user account', error));
});

module.exports = router;
