const {google} = require('googleapis');
const keys = require('../config/keys');
module.exports = app => {

    //Handle search request, call google api to grab related videos' information
    app.post("/search", function(req, res){
        google.youtube('v3').search.list({
            key: keys.googleAPIKey,
            part: 'snippet',
            q: req.body.term,
            type: 'video',
            maxResults: 20,
            }).then( async (response) => {
                var rp = await getInfo(response.data.items);
                res.send(rp);
            }).catch((err) => {
        });
    });

    /** 
     * @param {array} items
     * @return {array} 
     * */
    async function getInfo(items){
        //Sort out Youtube videos data and store in an array

        let videosInfo = [];
        let ids = [];
        for(const item of items){
            ids.push(item.id.videoId);
        }

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
};