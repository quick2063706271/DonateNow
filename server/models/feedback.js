/* Feedback model */
'use strict';

const mongoose = require('mongoose');


// Feedback schema 
const FeedbackSchema = new mongoose.Schema({
    //id: Number, 
    fId: Number, 
    userId: Number, 
    title: { 
		type: String,
        required: true,
		minlength: 10, 
        maxlength: 100 
	}, 

    description: { 
		type: String,
        required: true,
		minlength: 30, 
        maxlength: 1000 
	}, 

    isResolved: {
		type: Boolean,
		default: false 
	}
});



const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = { Feedback };
