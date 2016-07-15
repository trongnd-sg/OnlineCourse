var express = require('express')
var Subject = require('../models/Subject')
var Result  = require('../models/Result')

var router  = express.Router()


router.get('/', function(req, res, next) {
    Subject
    .find({})
    .sort('sequence')
    .exec(function(err, subjects) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json(subjects)
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
