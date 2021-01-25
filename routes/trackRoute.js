"use strict";

const trackControls = require('../controls/trackControls');

module.exports = app => {
  
  //Get track video list of current user.
  app.get('/track', async (req, res) => {
      if(!req.user.googleId){
          res.status(401).json({ error: 'login-required'});
      }
      const trackList = await trackControls.getTrack(req.user.googleId);
      res.status(200).send(trackList);
  });
    
  //Post new track
  app.post('/track', async (req, res) =>{
    if(!req.user.googleId){
      res.status(401).json({ error: 'login-required'});
    }
    const postResult = await trackControls.postTrack(req.body.keyword, req.user.googleId);
    if(postResult.error && postResult.error === 'unavailable'){
      res.status(503).send(postResult);
    }

    if(postResult.error && postResult.error === 'duplicate'){
      res.status(409).send(postResult);
    }

    res.status(200).send(postResult);
  });

  //Delete a specific track
  app.delete('/track/:id', async(req, res) => {
    if(!req.user.googleId){
      res.status(401).json({ error: 'login-required'});
    }
    const error = await trackControls.deleteTrack(req.user.googleId, req.params.id);
    if(error === 'unavailable'){
      res.status(503).send(error);
    }

    if(error === 'user-invalid'){
      res.status(403).send(error);
    }
    res.status(200).send();
  });
}