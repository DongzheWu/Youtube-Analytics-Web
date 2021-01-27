"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;
//Store video records.
const RecordSchema = new Schema({
    googleId: String,
    keyword: String,
    videoId: String,
    title: String,
    tags: [String],
    values: [Number],
    redates: [Date],
});

mongoose.model('records', RecordSchema);