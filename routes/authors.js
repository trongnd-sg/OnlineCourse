var express     = require('express')
var User        = require('../models/User')
var Result      = require('../models/Result')
var StringUtils = require('../utils/StringUtil')
var router      = express.Router()

/**
 *  GET users listing. 
 */
router.get('/', function(req, res, next) {
  var searchCtx = { role: 'Teacher' }
  if (req.query.page)
    searchCtx.page = parseInt(req.query.page)
  if (searchCtx.page && searchCtx.page < 1)
    searchCtx.page = 1
  if (req.query.size)
    searchCtx.size = parseInt(req.query.size)
  if (searchCtx.size && searchCtx.size < 0)
    searchCtx.size = 20
  
  User.search(searchCtx, function(err, users, total) {
    if (err) {
      res.status(err.status).json(err)
      return
    }
    res.json({ authors: users, total: total })
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

router.post('/', function(req, res, next) {
  var user = new User(req.body)
  user.role = 'Teacher'
  user.save(function(err, result) {
    if (err) {
      res.json(Result.DBError)
      return
    }
    res.json(result)
  }) 
})

module.exports = router
