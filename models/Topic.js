var mongoose = require('mongoose')
var StringUtils = require('../utils/StringUtil')

var TopicSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
	title: {
		type: String,
		required: true
	},
    friendlyTitle: {
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

TopicSchema.pre('save', function(next) {
	this.friendlyTitle = StringUtils.getFriendlyURL(this.title)
	next()
})

module.exports = mongoose.model('Topic', TopicSchema)