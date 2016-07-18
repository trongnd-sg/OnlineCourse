var express = require('express')
var Topic   = require('../models/Topic')
var Result  = require('../models/Result')

var router  = express.Router()


router.get('/', function(req, res, next) {
    var searchCtx = {}
    if (req.query.page)
        searchCtx.page = parseInt(req.query.page)
    if (searchCtx.page && searchCtx.page < 1)
        searchCtx.page = 1
    if (req.query.size)
        searchCtx.size = parseInt(req.query.size)
    if (searchCtx.size && searchCtx.size <= 0)
        searchCtx.size = 20
    if (req.query.subjectId && req.query.subjectId !== '')
        searchCtx.subjectId = req.query.subjectId 
    
    Topic.search(searchCtx, function(err, topics, total) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json({ topics: topics, total: total })
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
