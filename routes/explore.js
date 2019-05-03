var express = require('express');
var router = express.Router();

<<<<<<< HEAD
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
=======
router.get('/explore', (req, res, next) => {
  res.render('exploreview.hbs', { title: 'Express' });
>>>>>>> b5ba601be64c4c6ed9154a16b2e446b3957f2c28
});

module.exports = router;
