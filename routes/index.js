var express = require('express')
var router  = express.Router()
var oauth   = require('../config/oauth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', oauth: oauth });
});

router.get('/google', function(req, res, next) {
  res.render('google', { title: 'Express', oauth: oauth });
});

module.exports = router;
