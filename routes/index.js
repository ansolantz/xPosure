'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('home.hbs');
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

module.exports = router;
