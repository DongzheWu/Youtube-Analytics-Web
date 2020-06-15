const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrackSchema = new Schema({
    googleId: String,
    keyword: String,
    videoIds: [String],
    videoTitles: [String],
    videoPubTimes: [String]

});

mongoose.model('tracks', TrackSchema);