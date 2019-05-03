var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('home.hbs', { title: 'Express' });
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs', { title: 'Express' });
});

module.exports = router;
