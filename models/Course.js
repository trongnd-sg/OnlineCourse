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
    urlTitle: {
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
        title: {
            type: String,
            require: true
        },
        urlTitle: {
            type: String,
            require: true,
            unique: true
        },
        contents: [{
            title: {
                type: String,
                require: true
            },
            trailer: {
                url: String,
                duration: Number
            },
            video: {
                url: String,
                duration: Number,
                subtitles: [ String ]
            }
        }]
    }],
    rating: {
        averageScore: Number,
        total: Number,
        rating5Star: Number,
        rating4Star: Number,
        rating3Star: Number,
        rating2Star: Number,
        rating1Star: Number,
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

CourseSchema.methods.add = function() {

}


module.exports = mongoose.model('Course', CourseSchema)