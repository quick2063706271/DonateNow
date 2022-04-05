/* Feedback model */
'use strict';

const mongoose = require('mongoose');

// Feedback schema 
const PostImageSchema = new mongoose.Schema({
    //feedbackId: Number, 
    postId: {
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



const PostImage = mongoose.model('PostImage', PostImageSchema);

module.exports = { PostImage };
