const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
    googleId: String,
    topicList: [Object],
});

mongoose.model('topics', TopicSchema);