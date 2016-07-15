var express     = require('express')
var User        = require('../models/User')
var Result      = require('../models/Result')
var StringUtils = require('../utils/StringUtil')
var router      = express.Router()

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

router.get('/:id', function(req, res, next) {
  if (StringUtils.isHex(req.params.id)) { // get by user ID
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.status(Result.DBError.status).json(Result.DBError)
        return
      }
      if (!user) {
        res.status(Result.UserNotExisted.status).json(Result.UserNotExisted)
        return
      }
      res.json(user)
    })
  } else { // get by user name
    User.getByName(req.params.id, function(err, user) {
      if (err) {
        res.status(err.status).json(err)
        return
      }
      res.json(user)
    })
  }
})

module.exports = router
