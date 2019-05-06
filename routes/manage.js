'use strict';

const express = require('express');
const router = express.Router();

/* GET /manage */

router.get('/', (req, res, next) => {
  res.render('mymedia');
});

module.exports = router;
