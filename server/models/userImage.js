/* Feedback model */
'use strict';

const mongoose = require('mongoose');

// Feedback schema 
const UserImageSchema = new mongoose.Schema({
    //feedbackId: Number, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
});



const UserImage = mongoose.model('UserImage', UserImageSchema);

module.exports = { UserImage };
