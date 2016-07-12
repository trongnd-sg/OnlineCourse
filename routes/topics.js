var express = require('express')
var Topic   = require('../models/Topic')
var Result  = require('../models/Result')

var router  = express.Router()


router.get('/', function(req, res, next) {
    Topic.find({}, function(err, topics) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json(topics)
    })
})

router.get('/:title', function(req, res, next) {
    var urlTile = req.params.title
    Topic
    .findOne({ 'urlTitle': urlTile })
    .exec(function (err, topic) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json(topic)
    })
})

router.post('/', function(req, res, next) {
    var topic = new Topic(req.body);
    topic.add(function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    })
})

module.exports = router
