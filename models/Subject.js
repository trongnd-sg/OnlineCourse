var mongoose    = require('mongoose')
var Result      = require('../models/Result')
var StringUtils = require('../utils/StringUtil')

var SubjectSchema = mongoose.Schema({
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
    sequence: {
        type: Number,
        default: 1
    },
    thumbnail: {
        type: String
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    created: {
    	type: Date,
    	default: new Date()
    }
})

SubjectSchema.statics.generateUrlTitle = function(title, suffix, callback) {
	var self = this.model('Subject')
    var urlTitle = title
	if (suffix >= 0) urlTitle += '-' + suffix 
	self.find({ 'urlTitle': urlTitle }, function(err, subjects) {
		if (err) {
			console.log('GenerateURLName:', err)
			return callback(Result.DBError)
		}
		if (subjects && subjects.length > 0) {
			return self.generateUrlTitle(urlTitle, suffix + 1, callback)
		}
		return callback(null, urlTitle)
	})
}

SubjectSchema.methods.add = function(callback) {
    var self = this
    async.waterfall([
        function(cb) {
            self.model('Subject').generateUrlTitle(StringUtils.getUrlTitle(this.title.vi), -1, function(err, urlTitle) {
                self.urlTitle = urlTitle
                return cb(null)
            })
        },
        function(cb) {
            self.model('Subject').save(function(err, subject) {
                if (err)
                    return callback(Result.DBError)
                return callback(null, subject)
            })
        }
    ], function(err, result) {
        callback(err, result)
    })
}


module.exports = mongoose.model('Subject', SubjectSchema)