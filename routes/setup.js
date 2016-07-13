var async    = require('async')
var express  = require('express')
var Subject  = require('../models/Subject')
var Topic    = require('../models/Topic')
var Course   = require('../models/Course')
var Result   = require('../models/Result')

var subjects = require('../data/subjects')
var topics   = require('../data/topics')
var courses  = require('../data/courses')

var router = express.Router()


router.post('/subjects', function(req, res, next) {
    var tasks = []
    subjects.forEach(function(sub) {
        var subject = new Subject(sub)
        tasks.push(function(cb) {
            subject.add(function(err, result) {
                if (err)
                    err.description = subject.title
                return cb(err, result)
            })
        })
    })
    
    async.parallel(tasks, function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    }) 
})

router.post('/topics', function(req, res, next) {
    var tasks = []
    topics.forEach(function(top) {
        var topic = new Topic(top)
        tasks.push(function(cb) {
            topic.add(function(err, result) {
                if (err)
                    err.description = topic.title
                return cb(err, result)
            })
        })
    })
    
    async.parallel(tasks, function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    })
})

router.post('/courses', function(req, res, next) {
    var tasks = []
    courses.forEach(function(course) {
        var c = new Course(course)
        tasks.push(function(cb) {
            c.save(function(err, result) {
                if (err)
                    err.description = c.title
                return cb(err, result)
            })
        })
    })
    
    async.parallel(tasks, function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    })
})

module.exports = router
