var async   = require('async')
var express = require('express')
var Subject = require('../models/Subject')
var Result  = require('../models/Result')

var router  = express.Router()


router.get('/', function(req, res, next) {
    var paging = req.query
    var query = Subject.find({})
    var countQuery = Subject.find({})
    if (paging) {
        query = query.skip((parseInt(paging.page) - 1) * parseInt(paging.size))
		query = query.limit(parseInt(paging.size))
    }
    query = query.sort('sequence')
    async.parallel([
        function(cb) {
            query.exec(function(err, subjects) {
                if (err) {
                    return cb(Result.DBError)
                }
                return cb(null, subjects)
            })
        },
        function(cb) {
            countQuery.count(function(err, total) {
                if (err) {
                    return cb(Result.DBError)
                }
                return cb(null, total)
            })
        }
    ], function(err, result) {
        if (err) {
            res.json(err)
            return
        }
        res.json({ subjects: result[0], total: result[1]})
    })
    
})

router.get('/:title', function(req, res, next) {
    var urlTile = req.params.title
    Subject
    .findOne({ 'urlTitle': urlTile })
    .populate('topics')
    .exec(function (err, subject) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json(subject)
    })
})

router.post('/', function(req, res, next) {
    var subject = new Subject(req.body);
    subject.add(function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    })
})



module.exports = router
