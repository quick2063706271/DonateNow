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
        trim: true,
        enum: ["posted", "donation matched", "completed", "failed"],
        default: "posted"
    },
    viewers: [ViewerStatusSchema],
    imageSrc: {
        type: String, // change later
        default: "default image src"
    },
    deliveryOption: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    header: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    location: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    description: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    categories: {
        type:[{
            type: String,
            minlength: 1,
            trim: true,
            enum: ["Toys", "Kids", "Parents", "Interests", "Electronics", "Clothing", "Books & Stationary", "All"]
        }],
        default: []
    },
    blocked: {
        type: Number,
        default: 0
    },
    views: { 
        type: Number,
        default: 0
    },
    datePosted: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: "00/00/0000"
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
        trim: true,
        enum: ["requested", "requst accepted", "completed", "failed"]
    }
})