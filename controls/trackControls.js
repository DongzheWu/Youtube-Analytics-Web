"use strict";

const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Video = mongoose.model('videos');
const {google} = require('googleapis');

/** 
 * @param {string} googleId
 * */
const getTrack = async function(googleId){
  // Retrieve track list of current user from MongoDB
  const curUser = await User.findOne(  { googleId: googleId});
  return curUser.tracks;
}

/** 
 * @param {string} keyword
 * @param {string} googleId
 * @return {object} 
 * */
const postTrack = async function(keyword, googleId){

  //Check if added keyword has existed.
  const existKeyword = await User.findOne({
      'tracks':{
          $elemMatch:{
              'keyword': keyword
          }
      }
  });

  if(!existKeyword){
    try{
      //Take the first 20 videoes of the added keyword for tracking.
      const response = await google.youtube('v3').search.list({
        key: keys.googleAPIKey,
        part: 'snippet',
        q: keyword,
        type: 'video',
        maxResults: 20,
      });

      try{
        //Save the videos information.
        await saveInfo(response.data.items, googleId, keyword);
        const curUser = await User.findOne(  { googleId: googleId});
        return curUser.tracks[curUser.tracks.length - 1];
      }catch(err){
        console.log(err);
        return {error: 'unavailable'};
      }
      
    }catch(e){
      console.log(e);
      return {error: 'unavailable'};
    }
  }
  return {error: 'duplicate'};
}


/** 
 * @param {string} googleId
 * @param {string} trackId
 * @return {string} 
 * */
const deleteTrack = async function(googleId, trackId){
  
  let error = '';
  try{
    const curUser = await User.findOne({ googleId: googleId }, {
      'tracks': {$elemMatch: {'_id': trackId}}
    });

    const keyword = curUser.tracks[0].keyword;

    try{
      //Delete the specific track keyword from User databse.
      await User.updateOne({ googleId: googleId }, {
        $pull: {
            'tracks': {
                '_id': trackId
            }
        }
      });
      //Delete all tracked data of videos which are related to the track keyword.
      await Video.deleteMany({googleId: googleId, keyword: keyword});
    }catch(e){
      console.log(e);
      error = 'unavailable';
    }

  }catch(err){
    console.log(err);
    error = 'user-invalid';
  }
  return error;

}

/** 
 * @param {array} items
 * @param {string} googleId
 * @param {string} keyword
 * */
const saveInfo = async function(items, googleId, keyword){
  //Add new track keyword to User Database and save related videos to Video Database.

  await User.updateOne({ googleId: googleId }, {
      $push: {
          'tracks': {
              'keyword': keyword,
              'addDate': Date.now(),
          }
      }
  });

  for(const item of items){
    await new Video({
      googleId: googleId,
      keyword: keyword,
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      videoPubTime: item.snippet.publishTime,
    }).save();
  }
}
const trackControls = {
  getTrack,
  postTrack,
  deleteTrack
}
module.exports = trackControls;


