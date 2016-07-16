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

TopicSchema.statics.generateUrlTitle = function(title, suffix, callback) {
	var self = this.model('Topic')
    var urlTitle = title
	if (suffix >= 0) urlTitle += '-' + suffix 
	self.find({ 'urlTitle': urlTitle }, function(err, topics) {
		if (err) {
			console.log('GenerateURLName:', err)
			return callback(Result.DBError)
		}
		if (topics && topics.length > 0) {
			return self.generateUrlTitle(urlTitle, suffix + 1, callback)
		}
		return callback(null, urlTitle)
	})
}

TopicSchema.methods.add = function(callback) {
    var self = this
    async.waterfall([
        function(cb) {
            self.model('Topic').generateUrlTitle(StringUtils.getUrlTitle(self.title.vi), -1, function(err, urlTitle) {
                self.urlTitle = urlTitle
                return cb(null)
            })
        },
        function(cb) {
            Subject.findById(self.subjectId, function(err, subject) {
                if (err)
                    return cb(Result.DBError)
                if (!subject) 
                    return cb(Result.InvalidArgument)
                return cb(null, subject)
            })
        },
        function(subject, cb) {
            self.save(function(err, savedTopic) {
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