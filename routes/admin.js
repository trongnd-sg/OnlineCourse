var express = require('express')
var router  = express.Router()
var oauth   = require('../config/oauth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express', oauth: oauth })
})

module.exports = router
