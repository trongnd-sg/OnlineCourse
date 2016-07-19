var express      = require('express')
var Course       = require('../models/Course')
var Result       = require('../models/Result')
var StringUtils  = require('../utils/StringUtil')

var router       = express.Router()

/**
 * searchContext: {
 *  text: '',
 *  subject: 'subjectId',
 *  topic: 'topicId',
 *  free: true/false,
 *  page: 1,
 *  size: 20,
 *  order: 1 // 1 - released date; 2 - popular;
 * }
 */
router.get('/', function(req, res, next) {
    var searchContext = {}
    if (req.query.text && req.query.text !== '')
        searchContext.text = req.query.text.toLowerCase()
    if (req.query.subjectId && req.query.subjectId !== '')
        searchContext.subject = req.query.subjectId
    if (req.query.topic && req.query.topic !== '')
        searchContext.topic = req.query.topic.toLowerCase()
    if (req.query.free && req.query.free !== '')
        searchContext.free = req.query.free.toLowerCase() == 'true'
    if (req.query.page && req.query.page !== '') {
        searchContext.page = parseInt(req.query.page)
        if (searchContext.page < 1) 
            searchContext.page = 1
    }
    if (req.query.size && req.query.size !== '') {
        searchContext.size = parseInt(req.query.size)
        if (searchContext.size < 1)
            searchContext.size = 20
    } else {
        searchContext.size = 20
    }
    if (req.query.order && req.query.order !== '') {
        searchContext.order = parseInt(req.query.order)
    }
     
    Course.search(searchContext, function(err, courses, total) {
        if (err) {
            res.status(err.status).json(err)
            return
        }
        res.json({ courses: courses, total: total })
    })
})

router.get('/:id', function(req, res, next) {
    if (StringUtils.isHex(req.params.id)) { // the param is course ID
        var courseId = req.params.id
        Course.findById(courseId, function(err, course) {
            if (err) {
                res.status(Result.DBError.status).json(Result.DBError)
                return
            }
            if (!course) {
                res.status(Result.CourseNotExisted.status).json(Result.CourseNotExisted)
                return
            }
            res.json(course)
        })
    } else { // the param is course title
        var urlTitle = req.params.id
        Course.getByTitle(urlTitle, function (err, course) {
            if (err) {
                res.status(err.status).json(err)
                return
            }
            res.json(course)
        })
    }
})

router.post('/', function(req, res, next) {
    var course = new Course(req.body);
    course.save(function(err, result) {
        if (err) {
            res.json(err)
            return
        }
        res.json(result)
    })
})

module.exports = router
