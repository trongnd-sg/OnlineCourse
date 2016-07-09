var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
	email: {
		type: String,
	},
	password: {
		type: String
	},
	facebook: {
        id: String,
        email: String
    },
    google: {
        id: String,
        email: String
    },
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	middleInitial: {
		type: String
	},
    avatar: { // link to avatar
        type: String
    },
	intro: {
		type: String
	},
	jobs: [{
		from: Number,
		to: Number,
		title: String,
		location: String,
		description: String
	}],
	teachingCourses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	}],
	registeredCourses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	}],
	role: {
    	type: String,
    	enum: [ 'User', 'Admin', 'Teacher' ],
    	default: 'User'
    },
    status: {
        type: String,
        enum: [ 'Pending', 'Activated', 'Disabled' ],
        default: 'Pending'
    },
    created: {
    	type: Date,
    	default: new Date()
    }
})

/*
 * encrypt password
 */
UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

/*
 * checking if password is valid
 */
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

/* 
 * custom to JSON
 */
UserSchema.methods.toJSON = function() {
	var obj = this.toObject()
	obj.created = obj.created.getTime()
    delete obj.__v
    if (obj.password)
        delete obj.password
	return obj
}

module.exports = mongoose.model('User', UserSchema)