const mongoose = require('mongoose');
const VideoSchema = require('./Video');
const { Schema } = mongoose;


const TrackSchema = new Schema({
    keyword: String,
    addDate: Date,
});
// mongoose.model('tracks', TrackSchema);
module.exports = TrackSchema;