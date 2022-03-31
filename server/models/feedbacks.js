/* Feedback model */
'use strict';

const mongoose = require('mongoose');

// Feedback schema 
const FeedbackSchema = new mongoose.Schema({
    //feedbackId: Number, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userId"
    }, 
    title: { 
		type: String,
        //required: true,
		minlength: 10, 
        maxlength: 100 
	}, 
    content: { 
		type: String,
        //required: true,
		minlength: 30, 
        maxlength: 1000 
	}, 
    isResolved: {
		type: Boolean,
		default: false 
	}
});



const Feedbacks = mongoose.model('Feedbacks', FeedbackSchema);

module.exports = { Feedbacks };
