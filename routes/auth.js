
var express  = require('express')
var jwt      = require('jsonwebtoken')
var request  = require('request')

var secret   = require('../config/jwt').secret

var User     = require('../models/User')
var Result   = require('../models/Result')

var router   = express.Router()

/*
	sign-in with email & password
	{
		email: 'test@example.com',
		password: '123456'
	}
 */
function doLocalLogin(req, res, next) {
	if (req.body.email == undefined || req.body.email == '') {
		res.status(Result.InvalidArgument.status).json(Result.InvalidArgument)
		return
	}
	User.find({ 'email': req.body.email.toLowerCase() }).limit(1).exec(function(err, results) {
		if (err) {
			res.status(Result.DBError.status).json(Result.DBError)
			return
		}
		if (results == undefined || results.length <= 0) {
			res.status(Result.EmailNotRegistered.status).json(Result.EmailNotRegistered)
			return
		}
		var user = results[0]
		console.log(user.local.password)
		if (!user.validPassword(req.body.password)) {
			res.status(Result.InvalidPassword.status).json(Result.InvalidPassword)
			return
		}
		var token = jwt.sign({ 
			user: user, 
			type: 'local' 
		}, secret, {
          expiresIn: 1440 * 60 // expires in 24 hours
        })
        res.json({
        	user: user,
        	token: token
        })
	})
}

function doLoginWithGoogle(req, res, next) {
	var access_token = req.body.token
	if (access_token == undefined) {
		res.status(Result.InvalidArgument.status).json(Result.InvalidArgument)
		return
	}
	var url = 'https://www.googleapis.com/oauth2/v2/userinfo'
	request({
		uri: url,
		method: 'GET',
		headers : {
            'Authorization': 'Bearer ' + access_token
        }		
	}, function(error, response, body) {
		if (error) {
			res.status(Result.GoogleOAuthFailed.status).json(Result.GoogleOAuthFailed)
			return
		}
		var obj = JSON.parse(body)
		console.log(obj)
		User.find({ 'google.id': obj.id }).limit(1).exec(function(err, users) {
			if (err) {
				res.status(Result.DBError.status).json(Result.DBError)
				return
			}
			if (users == undefined || users.length <= 0) {
				var user = new User({
					google: {
						id: obj.id,
        				email: obj.email,
					},
					status: 'Activated'
				})
				if (!user.name && obj.name)
					user.name = obj.name
				user.save(function(err, result) {
					if (err) {
						res.status(Result.DBError.status).json(Result.DBError)
						return
					}
					var token = generateAuthToken(result, 'google')
			        res.json({ user: result, token: token })
			        return
				})
				return
			}
			var token = generateAuthToken(users[0], 'google')
	        res.json({ user: users[0], token: token })
		})
	})
}

function doLoginWithFacebook(req, res, next) {
	var access_token = req.body.token
	if (access_token == undefined) {
		res.status(Result.InvalidArgument.status).json(Result.InvalidArgument)
		return
	}
	var url = 'https://graph.facebook.com/me?fields=email,name&access_token=' + access_token
	request({
		uri: url,
		method: 'GET',
	}, function(error, response, body) {
		if (error) {
			res.status(Result.FacebookOAuthFailed.status).json(Result.FacebookOAuthFailed)
			return
		}
		var obj = JSON.parse(body)
		console.log(obj)
		User.find({ 'facebook.id': obj.id }).limit(1).exec(function(err, users) {
			if (err) {
				res.status(Result.DBError.status).json(Result.DBError)
				return
			}
			if (users == undefined || users.length <= 0) {
				var user = new User({
					facebook: {
						id: obj.id,
        				email: obj.email
					},
					status: 'Activated'
				})
				if (!user.name && obj.name)
					user.name = obj.name
				user.save(function(err, result) {
					if (err) {
						res.status(Result.DBError.status).json(Result.DBError)
						return
					}
					var token = generateAuthToken(result, 'facebook')
			        res.json({ user: result, token: token })
			        return
				})
				return
			}
			var token = generateAuthToken(users[0], 'facebook')
	        res.json({ user: users[0], token: token })
		})
	})
}

function generateAuthToken(user, method) {
	return jwt.sign({ user: user, method: method }, secret, { expiresIn: 1440 /* expire in 24 hours */})
}

router.post('/', function(req, res, next) {
	var loginMethod = req.body.method 
	console.log('Body:', req.body)
	if (!loginMethod) {
		res.status(Result.InvalidArgument.status).json(Result.InvalidArgument)
		return
	}
	
	if (loginMethod.toLowerCase() === 'local') {
		doLocalLogin(req, res, next)
	} else if (loginMethod.toLowerCase() === 'facebook') {
		doLoginWithFacebook(req, res, next)
	} else if (loginMethod.toLowerCase() == 'google') {
		doLoginWithGoogle(req, res, next) 
	} else {
		res.status(Result.InvalidArgument.status).json(Result.InvalidArgument)
	}
})

/**
 * refresh token
 */
router.put('/', function(req, res, next) {
	var token =  req.body.token || req.query.token || req.headers['x-authorization']
	// return if user not sign in yet
	if (!token) {
		res.status(Result.UnAuthorized.status).json(Result.UnAuthorized)
		return
	}
})

module.exports = router

