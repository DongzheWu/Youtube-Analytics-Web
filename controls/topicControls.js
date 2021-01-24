"use strict";

const mongoose = require('mongoose');
const Topic = mongoose.model('topics');
const uuid = require('uuid').v4;

/** 
 * @param {string} googleId
 * @return {object} 
 * */
const getSavedTopics = async function(googleId){
  //Grab user's saved trend topics
  const savedTopics = await Topic.findOne({ googleId: googleId});
  return savedTopics;
}

/** 
 * @param {string} topic
 * @param {string} googleId
 * @return {object} 
 */
const saveTopic = async function(topic, googleId){
  //Save new trend topic.
  const savedTopics = await Topic.findOne({ googleId: googleId});

  const topicId = uuid();
  const newTopic = {
    topicId: topicId,
    topic: topic
  };
  
  //Check the topic list exists or not.
  if(!savedTopics){
    const topicList = [];
    topicList.push(newTopic);
    try{
      await new Topic({
        googleId: googleId,
        topicList: topicList,  
      }).save();

    }catch(err){
      console.log(err);
    }
  }else{
    try{
      await Topic.findOneAndUpdate(
        {  googleId: googleId },
        { $push: { topicList: newTopic } }
      );
    }catch(err){
      console.log(err);
    }
  }
  return newTopic;  
}

/** 
 * @param {string} topic
 * @return {string} 
 */
const checkTopic = function(topic){
  let error = "";

  if(!topic || !topic.trim()){
    error = "empty-post";
  }
  return error;
}

/** 
 * @param {string} topic
 */
const deleteTopic = async function(topicId, googleId){
  //delete specific topic
  try{
    await Topic.findOneAndUpdate(
      { googleId: googleId },
      { $pull: { topicList: { topicId: topicId } } }
    );
  }catch(err){
      console.log(err);
  }
}

const topicControls = {
  getSavedTopics,
  saveTopic,
  checkTopic,
  deleteTopic
}

module.exports = topicControls;