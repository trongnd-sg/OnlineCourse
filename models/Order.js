var async       = require('async')
var mongoose    = require('mongoose')
var Result      = require('../models/Result')

var StringUtils = require('../utils/StringUtil')


var OrderSchema = mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    billingAddress: {
        type: String,
        default: ''
    },
    total: {
        type: Number,
        default: 0
    },
    coupon: {
        id: mongoose.Schema.Types.ObjectId,
        discount: Number
    },
    paymentMethod: {
        type: String,
        enum: [ 'Cash-1', 'Cash-2', 'PhoneCard', 'ATM', 'CreditCard' ],
        default: 'Cash-1'
    },
    status: {
        type: String,
        enum: [ 'Pending', 'Paid', 'Completed', 'Cancelled' ],
        default: 'Pending'
    },
    paidAt: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    created: {
    	type: Date,
    	default: new Date()
    }
}, { versionKey: false })

module.exports = mongoose.model('Order', OrderSchema)