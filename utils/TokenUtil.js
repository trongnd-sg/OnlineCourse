var jwt    = require('jsonwebtoken')
var secret = require('../config/jwt').secret
var Result = require('../models/Result')

module.exports = function authenticate(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-authorization']
	if (token) {
		jwt.verify(token, secret, function(err, decoded) {
			if (err)
	        	return res.status(Result.UnAuthorized.status).json(Result.UnAuthorized)
			req.user = decoded.user
	        return next()
	    })
	} else {
		return res.status(Result.UnAuthorized.status).json(Result.UnAuthorized)	
	}
}
