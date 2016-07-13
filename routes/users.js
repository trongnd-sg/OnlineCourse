var express = require('express')
var User    = require('../models/User')
var Result  = require('../models/Result')

var router  = express.Router()

/**
 *  GET users listing. 
 */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      res.status(Result.DBError.status).json(Result.DBError)
      return
    }
    res.json(users)
  })
})

module.exports = router
