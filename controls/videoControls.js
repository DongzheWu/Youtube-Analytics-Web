"use strict";
const mongoose = require('mongoose');
const Video = mongoose.model('videos');
/** 
 * @param {string} googleId
 * @return {object} 
 * */
const getVideos = async function(googleId, keyword){
  //Take record of tracked videos from MongoDB.
  const videos = await Video.find({googleId: googleId, keyword: keyword});
  return videos;
}

const videoControls = {
  getVideos
}
module.exports = videoControls;