const googleTrends = require('google-trends-api');
const countries = require('../models/countries')

module.exports = app => {
  //Get hot topics from google trend
  app.post("/top", async function(req, res){
        
    const country = req.body.country;
    try{
      const result = await googleTrends.dailyTrends({
        trendDate: new Date(Date.now()),
        geo: countries[country],
      });
      res.status(200).send(result);
    }catch(error){
      console.log(error);
      res.status(503).json({ error: 'unavailable'});
    }
  });
};