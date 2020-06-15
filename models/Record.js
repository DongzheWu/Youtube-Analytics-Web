const mongoose = require('mongoose');
const { Schema } = mongoose;

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