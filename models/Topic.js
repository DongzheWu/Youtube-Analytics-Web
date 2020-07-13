const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
    googleId: String,
    topicList: [String],
    topTopic: String

});

mongoose.model('topics', TopicSchema);