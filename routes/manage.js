var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/mymedia', (req, res, next) => {
  res.render('mymedia.hbs');
});

module.exports = router;
