var mongoose = require('mongoose')

var CourseSchema = mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
	title: {
		type: String,
		required: true
	},
    friendlyTitle: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    level: {
    	type: String,
    	enum: [ 'Beginner', 'Intermediate', 'Advanced', 'Expert' ],
    	default: 'Beginner'
    },
    thumbnail: {
        type: String
    },
    material: { // path to zip file 
        type: String
    },
    isFree: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseModule'
    }],
    rating: {
        averageScore: Number
    },
    releasedDate: {
        type: Date,
        default: new Date()
    },
    created: {
    	type: Date,
    	default: new Date()
    }
})


module.exports = mongoose.model('Course', CourseSchema)