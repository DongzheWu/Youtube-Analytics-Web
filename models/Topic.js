"use strict";

const mongoose = require('mongoose');
const { Schema } = mongoose;

//Store the topics user saved.
const TopicSchema = new Schema({
    googleId: String,
    topicList: [Object],
});

mongoose.model('topics', TopicSchema);