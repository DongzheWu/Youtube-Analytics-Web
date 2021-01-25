"use strict";
const keys = require('../config/keys');
const {google} = require('googleapis');

/** 
* @param {string} term
* @return {array} 
* */
const searchVideoList = async function(term){
  //Get video list of searched term.

  const response = await google.youtube('v3').search.list({
    key: keys.googleAPIKey,
    part: 'snippet',
    q: term,
    type: 'video',
    maxResults: 20,
  });

  return await getInfo(response.data.items);
}

/** 
* @param {array} items
* @return {array} 
* */
const getInfo = async function(items){
  //Sort out Youtube videos data and store in an array.

  let videosInfo = [];
  let ids = [];
  for(const item of items){
    ids.push(item.id.videoId);
  }

  //Grab detail information of the video
  let rep = await google.youtube('v3').videos.list({
    key: keys.googleAPIKey,
    part: 'snippet,contentDetails,statistics',
    id: ids,
  });

  for(let i = 0; i < items.length; i++){
    const snippet = rep.data.items[i].snippet;
    const contentDetails = rep.data.items[i].contentDetails;
    const statistics = rep.data.items[i].statistics;
    const parts = snippet.publishedAt.split("T");
    videosInfo.push({
      'title': snippet.title,
      'channelTitle': snippet.channelTitle,
      'channelId': snippet.channelId,
      'thumbnails': snippet.thumbnails.medium.url,
      'description':snippet.description,
      'tags': snippet.tags,
      'videoId': ids[i],
      'categoryId': snippet.categoryId,
      'publishedAt': parts[0],
      'duration': contentDetails.duration,
      'viewCount': statistics.viewCount,
      'likeCount': statistics.likeCount,
      'dislikeCount': statistics.dislikeCount,
      'commentCount': statistics.commentCount
    });
  }
  return videosInfo;
}

const searchControls = {
  searchVideoList,
  getInfo
}

module.exports = searchControls;