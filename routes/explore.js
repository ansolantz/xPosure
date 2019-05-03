var express = require('express');
var router = express.Router();

router.get('/explore', (req, res, next) => {
  res.render('exploreview.hbs', { title: 'Express' });
});

module.exports = router;
