
require('../models/Video');
const mongoose = require('mongoose');

module.exports = app => {
    
    // const VideoSchema = new Schema({
    //     googleId: String,
    //     keyword: String,
    //     videoId: String,
    //     videoTitle: String,
    //     videoPubTime: Date,
    //     recentViewCount: Number,
    //     averageUp: Number,
    //     tags: [String],
    //     values: [Number],
    //     redates: [Date],
    // });
    app.post('/videos', async(req, res) => {
        console.log("get videos");
        console.log(req.body.keyword);
        const Video = mongoose.model('videos');
        const videos = await Video.find({googleId: req.user.googleId, keyword: req.body.keyword});
        res.send(videos);
    });




};