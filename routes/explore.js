'use strict';

const express = require('express');
const router = express.Router();

router.get('/explore', (req, res, next) => {
  res.render('exploreview', { title: 'Express' });
});

module.exports = router;
