/* Terms COnditions model */
'use strict';

const mongoose = require('mongoose');


// Terms and Conditions schema 
const TermsConditionsSchema = new mongoose.Schema({
    header: { 
		type: String,
		required: true,
		minlength: 1,
		default: ""
	},

	description: { 
		type: String,
		required: true,
		minlength: 1,
		default: ""
        //maxlength: 1000 
	}
});

const TermsConditions = mongoose.model('TermsConditions', TermsConditionsSchema);

module.exports = { TermsConditions };
