var async       = require('async')
var mongoose    = require('mongoose')
var Result      = require('../models/Result')

var StringUtils = require('../utils/StringUtil')


var CouponSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        require: true
    },
    from: {
        type: Date,
        require: true
    },
    to: {
        type: Date,
        require: true
    },
    discount: {
        type: {
            type: String,
            enum: [ 'Percent', 'Value' ],
            default: 'Percent'
        },
        value: Number
    },
    status: {
        type: String,
        enum: [ 'Available', 'In Use', 'Used' ],
        default: 'Available'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
    	type: Date,
    	default: new Date()
    }
}, { versionKey: false })

module.exports = mongoose.model('Order', OrderSchema)