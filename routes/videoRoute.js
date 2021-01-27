
"use strict";
const videoControls = require('../controls/videoControls');

module.exports = app => {
  //Handle videos request to get record of tracked videos
  app.post('/videos', async(req, res) => {
    if(!req.user.googleId){
      res.status(401).json({ error: 'login-required'});
    }
    
    if(!req.user.googleId){
      res.status(503).json({ error: 'unavailable'});
    }
    const videos = await videoControls.getVideos(req.user.googleId, req.body.keyword);
    res.status(200).send(videos);
  });
};