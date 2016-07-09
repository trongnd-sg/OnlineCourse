var mongoose = require('mongoose')

var CourseModuleSchema = mongoose.Schema({
    courseId: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
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
    contents: [{
        title: String,
        trailer: {
            url: String,
            duration: Number
        },
        video: {
            url: String,
            duration: Number,
            subtitle: [String]
        }
    }],
    created: {
    	type: Date,
    	default: new Date()
    }
})

CourseModuleSchema.pre('save', function(next) {
	this.friendlyTitle = StringUtils.getFriendlyURL(this.title.vi)
	next()
})

module.exports = mongoose.model('CourseModule', CourseModuleSchema)