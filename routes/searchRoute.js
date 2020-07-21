const {google} = require('googleapis');
const keys = require('../config/keys');
module.exports = app => {

    var APICount = 1;
    function getSearchAPIKey(){
        APICount++;
        APICount = APICount % 3;
        console.log(APICount);
        return keys.googleSearchAPIKeys[APICount];
    }
    async function getInfo(items){
        var data = [];
        var arr = [];
        var ids = [];
        for(const item of items){
            ids.push(item.id.videoId);
        }

        var rep = await google.youtube('v3').videos.list({
            key: getSearchAPIKey(),
            part: 'snippet,contentDetails,statistics',
            id: ids,
        });

        for(var i = 0; i < items.length; i++){
            var snippet = rep.data.items[i].snippet;
            var contentDetails = rep.data.items[i].contentDetails;
            var statistics = rep.data.items[i].statistics;
            // console.log(rep.data.items);
            // console.log(snippet.publishedAt);
            // console.log(snippet.channelTitle);
            // console.log(snippet.title);
            // console.log(snippet.description);
            // console.log(snippet.thumbnails.medium.url);
            // console.log(snippet.tags);
            // console.log(contentDetails.duration);
            // console.log(statistics.viewCount);
            // console.log(statistics.likeCount);
            // console.log(statistics.dislikeCount);
            // console.log(statistics.commentCount);
            var parts = snippet.publishedAt.split("T");
            arr.push({
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
        return arr;

        
        // await getComments(items);

    }

    async function getComments(items){
        var data = [];
        for(const item of items){
            await google.youtube('v3').commentThreads.list({
                key: getSearchAPIKey(),
                part: 'snippet',
                videoId: item.id.videoId,
                maxResults: 100,
                // textFormat: 'plaintText'
            });
        }
        console.log(data);

    }


    app.post("/search", function(req, res){
        // var term = req.body.keyword;

            google.youtube('v3').search.list({
                key: getSearchAPIKey(),
                part: 'snippet',
                q: req.body.term,
                type: 'video',
                maxResults: 20,
              }).then( async (response) => {
                  var d = response;
                //   console.log(d.data.items);
                  var rp = await getInfo(d.data.items);
    
             
                  res.send(rp);
        
        
        
              }).catch((err) => {
                  console.log(err);
              });
            });
      
        

};