var mongoose = require('mongoose')
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
    friendlyTitle: {
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
    created: {
    	type: Date,
    	default: new Date()
    }
})

SubjectSchema.methods.add = function() {
    this.friendlyTitle = StringUtils.getFriendlyURL(this.title.vi)
    SubjectSchema.find({ 'friendlyTitle': this.friendlyTitle}, function(err, subject) {
        
    })
}

module.exports = mongoose.model('Subject', SubjectSchema)