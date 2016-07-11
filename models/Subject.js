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

SubjectSchema.methods.add = function(callback) {
    if (this.urlTitle == undefined || this.urlTitle == '')
        this.urlTitle = StringUtils.getUrlTitle(this.title.vi)
    var newSubject = this
    this.model('Subject').find({ 'urlTitle': this.urlTitle }, function(err, subject) {
        if (err) {
            return callback(Result.DBError)
        }
        if (subject && subject.length > 0) {
            return callback(Result.DuplicateTitle)
        }
        newSubject.save(function(err2, result) {
            if (err2) {
                return callback(Result.DBError)
            }
            return callback(null, result)
        })
    })
}


module.exports = mongoose.model('Subject', SubjectSchema)