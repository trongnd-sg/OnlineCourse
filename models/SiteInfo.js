var mongoose = require('mongoose')

var SiteInfoSchema = mongoose.Schema({
    email: String,
    phone: String,
    created: {
    	type: Date,
    	default: new Date()
    }
})

module.exports = mongoose.model('SiteInfo', SiteInfoSchema)