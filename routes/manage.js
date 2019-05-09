'use strict';

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const User = require('./../models/users');
const Media = require('./../models/media');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

/* GET /manage */

/* GET /manage/profile */

router.get('/profile', ensureAuthenticated, (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => res.render('profile', { user, title: 'Edit profile' }))
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

/* POST /manage/delete/user */

router.post('/delete/user', ensureAuthenticated, (req, res, next) => {
  const { _id } = req.body;
  User.deleteOne({ _id })
    .then(() => {
      Media.find({ creatorId: _id }, { '_id': 1, 'cloudId': '1', 'thumbnail_cloudId': '1' })
        .then((media) => {
          res.redirect('/logout');
          for (let i = 0; i < media.length; i++) {
            cloudinary.v2.uploader.destroy([media[i].cloudId], (error, result) => { console.log(result, error); });
            cloudinary.v2.uploader.destroy([media[i].thumbnail_cloudId], (error, result) => { console.log(result, error); });
            Media.deleteOne({ _id: media[i]._id })
              .then(() => {})
              .catch((error) => console.log('Unable to delete media from DB', error));
          };
        })
        .catch((error) => console.log('Unable to find user\'s media', error));
    })
    .catch((error) => console.log('Unable to delete user', error));
});

/* POST /manage/delete/media */

router.post('/delete/media', ensureAuthenticated, (req, res, next) => {
  const { _id } = req.body;
  const user = req.user;
  let deleteFromCloudinary = (media) => {
    cloudinary.v2.uploader.destroy(media.thumbnail_cloudId, (error, result) => { console.log(result, error); });
    cloudinary.v2.uploader.destroy(media.cloudId, (error, result) => { console.log(result, error); });
  };

  Media.findByIdAndDelete(_id)
    .then((media) => {
      deleteFromCloudinary(media);
    })
    .catch((err) => console.log(err))
    .then(() => res.redirect(`/${user.username}`))
    .catch((error) => console.log('Unable to delete media', error));
});

/* POST /manage/edit/:mediaId */
router.post('/edit', ensureAuthenticated, (req, res) => {
  const { _id } = req.query;
  const { description } = req.body;

  let isLiked = false;
  let isEditable = false;

  Media.findOneAndUpdate({ _id }, { $set: { meta: { description } } }, { new: true })
    .then((dbMedia) => {
      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          isLiked = dbUser.likes.includes(_id);
          if (dbUser._id.toString() === dbMedia.creatorId.toString()) {
            isEditable = true;
          }
          res.render('photoview', { dbMedia, dbUser, user: req.user, isLiked, isEditable });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/* GET /manage/media */

router.get('/:mediaId', ensureAuthenticated, (req, res) => {
  const { mediaId } = req.params;

  Media.findById(mediaId)
    .then((dbMedia) => {
      const { username } = req.user;
      User.findOne({ username })
        .then((dbUser) => {
          res.render('mediaedit', { dbMedia, dbUser, user: req.user, title: 'Edit photo' });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
