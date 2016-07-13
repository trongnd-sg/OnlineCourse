var express = require('express')
var Course  = require('../models/Course')
var Result  = require('../models/Result')

var router  = express.Router()

/**
 * searchContext: {
 *  text: '',
 *  subject: 'subjectId',
 *  topic: 'topicId',
 *  free: true/false,
 *  page: 0,
 *  size: 20,
 *  order: 1 // 1 - released date; 2 - popular;
 * }
 */
router.get('/', function(req, res, next) {
    var searchContext = req.query
     
    Course.search(searchContext, function(err, courses) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(courses)
    })
})

router.get('/:title', function(req, res, next) {
    var urlTitle = req.params.title
    Course.getByTitle(urlTitle, function (err, course) {
        if (err) {
            res.status(Result.DBError.status).json(Result.DBError)
            return
        }
        res.json(course)
    })
})

router.post('/', function(req, res, next) {
    var course = new Course(req.body);
    course.save(function(err, result) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json(result)
    })
})

module.exports = router
