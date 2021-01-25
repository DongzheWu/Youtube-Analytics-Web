"use strict";

const trendControls= require('../controls/trendControls');

module.exports = app => {
  //Get trend data of the selected keywords.
  app.post("/trend", async function(req, res){
    const trendData = await trendControls.checkTrend(req.body.range, req.body.country, req.body.items);
    if(!trendData){
      res.status(503).json({ error: 'unavailable'});
    }

    res.status(200).send(trendData);
    });
}