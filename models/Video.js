"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;

//VideoSchema stores the videos data to track.
const VideoSchema = new Schema({
    googleId: String,
    keyword: String,
    videoId: String,
    videoTitle: String,
    videoPubTime: Date,
    recentViewCount: Number,
    averageUp: Number,
    tags: [String],
    values: [Number],
    redates: [String],
});
mongoose.model('videos', VideoSchema);