var async       = require('async')
var mongoose    = require('mongoose')
var Subject     = require('../models/Subject')
var StringUtils = require('../utils/StringUtil')

var TopicSchema = mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
	title: {
		vi: {
            type: String,
            required: true
        },
        en: {
            type: String,
        }	
	},
    urlTitle: {
        type: String,
        required: true,
        unique: true
    },
    courseCount: {
        type: Number,
        default: 0
    },
    created: {
    	type: Date,
    	default: new Date()
    }
})

TopicSchema.methods.add = function(callback) {
    if (this.urlTitle == undefined || this.urlTitle == '')
        this.urlTitle = StringUtils.getUrlTitle(this.title.vi)
        var topic =this
    async.waterfall([
        function(cb) {
            this.model('Topic').find({ 'urlTitle': this.urlTitle }, function(err, result) {
                if (err)
                    return cb(Result.DBError)
                if (result && result.length > 0)
                    return callback(Result.DuplicateTitle)
                return cb(null)
            })
        },
        function(cb) {
            Subject.findById(topic.subjectId, function(err, subject) {
                if (err)
                    return cb(Result.DBError)
                if (!subject) 
                    return cb(Result.InvalidArgument)
                return cb(null, subject)
            })
        },
        function(subject, cb) {
            topic.save(function(err, savedTopic) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, subject, savedTopic)
            })
        },
        function(subject, savedTopic, cb) {
            subject.topics.push(savedTopic._id)
            subject.save(function(err) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, savedTopic)
            })
        }
    ], function(err, result) {
        return callback(err, result)
    })
}

module.exports = mongoose.model('Topic', TopicSchema)