const mongoose = require('mongoose');
const { Schema } = mongoose;

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
// mongoose.model('tracks', TrackSchema);
mongoose.model('videos', VideoSchema);