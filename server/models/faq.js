/* FAQ model */
'use strict';

const mongoose = require('mongoose');

// FAQ schema 
const FaqSchema = new mongoose.Schema({
    id: Number,
    question: { 
		type: String,
		minlength: 30, 
        maxlength: 1000 
	},
    answer: {
        type: String,
        required: true,
		minlength: 30, 
        maxlength: 1000 
    }
});

const Faq = mongoose.model('Faq', FaqSchema);

module.exports = { Faq };
