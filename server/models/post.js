/* Post model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')

const PostSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerId"
    },
    ownerStatus: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    viewers: [ViewerStatusSchema],
    imageSrc: {
        type: String // change later
    },
    deliveryOption: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    header: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    location: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    description: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    categories: [{
        type: String,
        minlength: 1,
        trim: true
    }],
    blocked: {
        type: Number
    },
    views: { 
        type: Number
    },
    saved: { // What is saved? Wishlisted??
        type: Number
    },
    datePosted: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
})

const ViewerStatusSchema = new mongoose.Schema({
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerId"
    },
    viewStatus: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
})