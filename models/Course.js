var async       = require('async')
var mongoose    = require('mongoose')
var Subject     = require('../models/Subject')
var Topic       = require('../models/Topic')
var Author      = require('../models/User')
var Result      = require('../models/Result')

var StringUtils = require('../utils/StringUtil')


var CourseSchema = mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    authors: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
	title: {
		type: String,
		required: true
	},
    urlTitle: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    level: {
    	type: String,
    	enum: [ 'Beginner', 'Intermediate', 'Advanced', 'Expert' ],
    	default: 'Beginner'
    },
    thumbnail: {
        type: String
    },
    material: { // path to zip file 
        type: String
    },
    isFree: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    modules: [{
        title: {
            type: String,
            require: true
        },
        urlTitle: {
            type: String,
            require: true,
            unique: true
        },
        contents: [{
            title: {
                type: String,
                require: true
            },
            trailer: {
                url: String,
                duration: Number
            },
            video: {
                url: String,
                duration: Number,
                subtitles: [ String ]
            }
        }]
    }],
    text: String,
    rating: {
        averageScore: Number,
        total: Number,
        rating5Star: Number,
        rating4Star: Number,
        rating3Star: Number,
        rating2Star: Number,
        rating1Star: Number,
    },
    released: {
        type: Date,
        default: new Date()
    },
    created: {
    	type: Date,
    	default: new Date()
    }
})

// add a text index to the tags array 
CourseSchema.index({ 'text': 'text' })

CourseSchema.pre('validate', function(next) {
    if (this.urlTitle == undefined || this.urlTitle == '')
        this.urlTitle = StringUtils.getUrlTitle(this.title)
    this.text = StringUtils.convertToViString(this.title) + ' ' + StringUtils.convertToViString(this.description)
    var newCourse = this
    
    async.parallel([
        function(cb) { // check title
            newCourse.model('Course').find({ 'urlTitle': newCourse.urlTitle }, function(err, result) {
                if (err)
                    return cb(Result.DBError)
                if (result && result.length > 0)
                    return cb(Result.DuplicateTitle)
                return cb(null)
            })
        },
        function(cb) { // check subject
            Subject.findById(newCourse.subject, function(err, subject) {
                if (err)
                    return cb(Result.DBError)
                if (subject == null)
                    return cb(Result.SubjectNotExisted)
                newCourse.text += ' ' + StringUtils.convertToViString(subject.title.vi);
                return cb(null)
            })
        },
        function(cb) { // check topic
            Topic.findById(newCourse.topic, function(err, topic) {
                if (err)
                    return cb(Result.DBError)
                if (topic == null)
                    return cb(Result.TopicNotExisted)
                newCourse.text += ' ' + StringUtils.convertToViString(topic.title.vi);
                return cb(null)
            })
        },
        function(cb) { // check authors
            return cb(null)
        }
    ], function(err, result) {
        next(err)
    })
})

CourseSchema.statics.getByTitle = function(title, callback) {
    var self = this
    self.model('Course')
    .find({ 'urlTitle': title })
    .populate('subject')
    .populate('topic')
    .populate('authors')
    .exec(function(err, courses) {
        if (err)
            return callback(Result.DBError)
        if (courses == null || courses.length == 0)
            return callback(Result.CourseNotExisted)
        return callback(null, courses[0])
    })
}

CourseSchema.statics.search = function(searchContext, callback) {
    var self = this.model('Course')
    var query = (searchContext.text && searchContext.text.length > 0) ? 
						self.find({ $text: { $search: StringUtils.convertToViString(searchContext.text) }}) : 
						self.find({})
    
    if (searchContext.free)
        query = query.where('isFree', true)

    if (searchContext.subject)
        query = query.where('subject', searchContext.subject)

    if (searchContext.topic)
        query = query.where('topic', searchContext.topic)

    if (searchContext.page && searchContext.size) {
	    query = query.skip((parseInt(searchContext.page) - 1) * parseInt(searchContext.size))
		query = query.limit(parseInt(searchContext.size))
    }

    if (searchContext.order && 2 == parseInt(searchContext.order))
        query = query.sort('-rating.total')
    else
        query = query.sort('-released')
    
    query.exec(function(err, courses) {
        if (err)
            return callback(Result.DBError)
        if (courses == null || courses.length == 0)
            return callback(Result.CourseNotFound)
        return callback(null, courses)  
    })
}


module.exports = mongoose.model('Course', CourseSchema)