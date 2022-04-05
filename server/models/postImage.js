/* Feedback model */
'use strict';

const mongoose = require('mongoose');


const PostImageSchema = new mongoose.Schema({

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
