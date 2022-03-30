/* FAQ model */
'use strict';

const mongoose = require('mongoose');

// FAQ schema 
const FAQSchema = new mongoose.Schema({
    id: Number, 
    question: { 
		type: String,
		minlength: 30, 
        maxlength: 1000 
	}, 
    answer: { 
		type: String,
		minlength: 30, 
        maxlength: 1000 
	}
});

const FAQ = mongoose.model('FAQ', FAQSchema);

module.exports = { FAQ };
