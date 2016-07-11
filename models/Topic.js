var mongoose = require('mongoose')
var StringUtils = require('../utils/StringUtil')

var TopicSchema = mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
	title: {
		type: String,
		required: true
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
    TopicSchema.find({ 'urlTitle': this.urlTitle }, function(err, topic) {
        if (err) {
            return callback(Result.DBError)
        }
        if (topic) {
            return callback(Result.DuplicateTitle)
        }
        this.save(function(err2, result) {
            if (err2) {
                return callback(Result.DBError)
            }
            return callback(null, result)
        })
    })
}

module.exports = mongoose.model('Topic', TopicSchema)