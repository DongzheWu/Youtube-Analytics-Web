const {google} = require('googleapis');
const keys = require('../config/keys');
module.exports = app => {

    var APICount = 1;
    function getSearchAPIKey(){
        APICount++;
        APICount = APICount % 3;
        return keys.googleSearchAPIKeys[APICount];
    }
    async function getInfo(items){
        var data = [];
    
        for(const item of items){
            await google.youtube('v3').videos.list({
                key: getSearchAPIKey(),
                part: 'snippet,contentDetails,statistics,status',
                id: item.id.videoId,
            }).then((rep) => {
    
                  
                data.push(rep.data);
    
            }).catch((err) => {
                console.log(err);
            });
        }
        // console.log(data);
        return data;
    
    
    }

    app.post("/search", function(req, res){
        // var term = req.body.keyword;
        console.log(".............................................")
        console.log(req.body.term);
    
        google.youtube('v3').search.list({
            key: getSearchAPIKey(),
            part: 'snippet',
            q: req.body.term,
            type: 'video',
            maxResults: 20,
          }).then((response) => {
              var d = response;
            //   console.log(d.data.items);
              getInfo(d.data.items).then((rp) => {
                  console.log(rp);
                  console.log(typeof(rp));
                //   res.write({'message': rp});
                  res.json({data: rp});
                  res.send();
              });
    
    
    
          }).catch((err) => {
              console.log(err);
          });
    });
};