/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	username: {
		type: String,
		minlength: 1,
		trim: true
	},
	gender: {
		type: String,
		minlength: 1,
		trim: true
	},
    address1: {
		type: String,
		trim: true
	},
	address2: {
		type: String,
		trim: true
	},
	phone: {
		type: Number
	},
	preference: {
		type: String,
		trim: true
	},
	bio: {
		type: String
	},
	wishlisted: [{type: mongoose.Schema.Types.ObjectId,
				  ref: "wishlisted"
				}],
	donated: [{type: mongoose.Schema.Types.ObjectId,
				  ref: "donated"
				}],
	transaction: [{type: mongoose.Schema.Types.ObjectId,
			       ref: "transaction"
				}],
	complaintNum: [{type: mongoose.Schema.Types.ObjectId,
				    ref: "complaintNum"
	  }],
	accountBlocked: {
		type: Boolean,
		default: false
	},
	admin: {
		type: Boolean,
		default: false
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }

