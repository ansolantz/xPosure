'use strict';

const express = require('express');
const router = express.Router();
const Media = require('../models/media');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

router.get('/', ensureAuthenticated, (req, res) => {
  console.log('EXPLORE VIEW!!!');

  Media.find({})
    .then((allTheMediaFromDB) => {
      console.log('All media:', allTheMediaFromDB);

      res.render('exploreview', { allTheMediaFromDB, user: req.user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
