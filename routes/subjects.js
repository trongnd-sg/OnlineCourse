var express = require('express')
var Subject = require('../models/Subject')
var Result  = require('../models/Result')

var router  = express.Router()


router.get('/', function(req, res, next) {
})

router.get('/:title', function(req, res, next) {
    var urlTile = req.params.title
    //Subject.find({ 'urlTitle': urlTile })
})

router.post('/', function(req, res, next) {
    var subject = new Subject(req.body);
    subject.add(function(err, result) {
        if (err) {
            res.status(Result.DBError).json(Result.DBError)
            return
        }
        res.json(result)
    })
})

module.exports = router
