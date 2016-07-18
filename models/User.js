var async       = require('async')
var bcrypt      = require('bcrypt-nodejs')
var mongoose    = require('mongoose')
var Result      = require('../models/Result')
var StringUtils = require('../utils/StringUtil')

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
	name: {
		type: String,
		require: true
	},
	urlName: {
		type: String,
		require: true,
		unique: true
	},
	title: {
		type: String
	},
	career: {
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
    return bcrypt.compareSync(password, this.password);
}

UserSchema.statics.generateUrlName = function(name, suffix, callback) {
	var self = this.model('User')
	var urlName = StringUtils.getUrlTitle(name)
	if (suffix >= 0) urlName += '-' + suffix 
	self.find({ 'urlName': urlName }, function(err, users) {
		if (err) {
			console.log('GenerateURLName:', err)
			return callback(Result.DBError)
		}
		if (users && users.length > 0) {
			return self.generateUrlName(name, suffix + 1, callback)
		}
		return callback(null, urlName)
	})
}

UserSchema.pre('validate', function(next) {
	var self = this
	if (self.urlName) {
		next()
		return;
	}
	self.model('User').generateUrlName(self.name, -1, function(err, urlName) {
		if (err) {
			next(err)
			return
		}
		self.urlName = urlName
		next()
	})
})

UserSchema.statics.getByName = function(name, callback) {
    var self = this
    self.model('User')
    .find({ 'urlName': name })
    //.populate('subject')
    //.populate('topic')
    .exec(function(err, authors) {
        if (err)
            return callback(Result.DBError)
        if (authors == null || authors.length == 0)
            return callback(Result.AuthorNotExisted)
        return callback(null, authors[0])
    })
}

UserSchema.statics.search = function(searchCtx, callback) {
	var self = this
	var query = self.model('User').find({ 'role': searchCtx.role })
	var countQuery = self.model('User').find({ 'role': searchCtx.role })
	if (searchCtx.page && searchCtx.size) {
		query = query.skip((searchCtx.page - 1) * searchCtx.size)
		query = query.limit(searchCtx.size)
	}
	async.parallel([
		function(cb) {
			countQuery.count(function(err, total) {
				if (err)
					return cb(Result.DBError)
				return cb(null, total)
			})
		},
		function(cb) {
			query.exec(function(err, users) {
				if (err)
					return cb(Result.DBError)
				return cb(null, users)
			})
		}
	], function(err, result) {
		if (err)
			return callback(err)
		return callback(null, result[1], result[0])
	})
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