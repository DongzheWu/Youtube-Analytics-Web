"use strict";
const {google} = require('googleapis');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const Video = mongoose.model('videos');

const getNewView = async function(){
  const videos = await Video.find();
  //Iterate all tracking videos
  for(const video of videos){
    //Get information of each videos.
    const rep = await google.youtube('v3').videos.list({
      key: keys.googleAPIKey,
      part: 'statistics',
      id: video.videoId,
    });
    //Check if the recent view of the video has been recorded.
    if(video.recentViewCount){

      const dt = new Date();
      await Video.updateOne({
        googleId: video.googleId,
        keyword: video.keyword,
        videoId: video.videoId
      },{
        $push:{
            values: rep.data.items[0].statistics.viewCount - video.recentViewCount,
            redates: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
        },
        recentViewCount: rep.data.items[0].statistics.viewCount
      });
    }else{
      //Initialize the first recent view
      video.recentViewCount = rep.data.items[0].statistics.viewCount;
      await video.save();
    }
  }
}

const viewControls = {
  getNewView
}
module.exports = viewControls;