/* User model */
'use strict';

const mongoose = require('mongoose')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const BlockListSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    username: {
		type: String,
		minlength: 1,
		trim: true
	},
	complaintNum: [{type: mongoose.Schema.Types.ObjectId,
				    ref: "complaintNum"
	  }],
	accountBlocked: {
		type: Boolean
	},
	admin: {
		type: Boolean
	}
})

// make a model using the Block List schema
const BlockList = mongoose.model('User', BlockListSchema)
module.exports = { BlockList }