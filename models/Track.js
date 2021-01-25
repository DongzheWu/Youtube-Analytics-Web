"use strict";
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Store keywords to track.
const TrackSchema = new Schema({
    keyword: String,
    addDate: Date,
});

module.exports = TrackSchema;