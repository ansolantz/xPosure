'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/mymedia', (req, res, next) => {
  res.render('mymedia');
});

module.exports = router;
