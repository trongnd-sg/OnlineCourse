var async       = require('async')
var mongoose    = require('mongoose')
var Subject     = require('../models/Subject')
var Result      = require('../models/Result')
var StringUtils = require('../utils/StringUtil')

var TopicSchema = mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
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
            Subject.findById(self.subject, function(err, subject) {
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

TopicSchema.statics.search = function(searchCtx, callback) {
    var self = this
    var query = self.model('Topic').find({})
    var countQuery = self.model('Topic').find({})
    if (searchCtx.subjectId) {
        query = query.where('subject', searchCtx.subjectId)
        countQuery = countQuery.where('subject', searchCtx.subjectId)
    }
    
    query.populate('subject')
    query.sort('title.vi')

    if (searchCtx.page && searchCtx.size) {
	    query = query.skip((searchCtx.page - 1) * searchCtx.size)
		query = query.limit(searchCtx.size)
    }
    
    async.parallel([
        function(cb) {
            query.exec(function(err, topics) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, topics)
            })
        },
        function(cb) {
            countQuery.count(function(err, total) {
                if (err)
                    return cb(Result.DBError)
                return cb(null, total)
            })
        }
    ], function(err, result) {
        if (err) {
            return callback(err)
        }
        return callback(null, result[0], result[1])
    })
}

module.exports = mongoose.model('Topic', TopicSchema)