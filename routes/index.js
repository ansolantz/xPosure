var express = require('express');
var router = express.Router();

const exploreRouter = require('./explore');
const manageRouter = require('./manage');

router.use('/explore', exploreRouter);
router.use('/manage', manageRouter);

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('home.hbs', { title: 'Express' });
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup.hbs', { title: 'Express' });
});

// /* Link to other routers. */

module.exports = router;
