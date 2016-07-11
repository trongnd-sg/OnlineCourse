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

    async.waterfall([
        function(cb) {
            TopicSchema.find({ 'urlTitle': this.urlTitle }, function(err, topic) {
                if (err)
                    return cb(Result.DBError)
                if (topic)
                    return callback(Result.DuplicateTitle)
                return cb(null)
            })
        },
        function(cb) {
            Subject.findById(this.subjectId, function(err, subject) {
                if (err)
                    return cb(Result.DBError)
                if (!subject) 
                    return cb(Result.InvalidArgument)
                return cb(null, subject)
            })
        },
        function(subject, cb) {
            this.save(function(err, topic) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, subject, topic)
            })
        },
        function(subject, topic, cb) {
            subject.tpoics.push(topic._id)
            subject.save(function(err) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, topic)
            })
        }
    ], function(err, result) {
        return callback(err, result)
    })
}

module.exports = mongoose.model('Topic', TopicSchema)