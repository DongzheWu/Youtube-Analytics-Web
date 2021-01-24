const keys = require('../config/keys');
const mongoose = require('mongoose');

module.exports = app => {
    async function saveInfo(items, googleId, keyword){

        const User = mongoose.model('users');
        await User.updateOne({ googleId: googleId }, {
            $push: {
                'tracks': {
                    'keyword': keyword,
                    'addDate': Date.now(),
                }
            }
        }).then(async() => {
            for(const item of items){
      
    
                const Video = mongoose.model('videos');
                const video = await new Video({
                    googleId: googleId,
                    keyword: keyword,
                    videoId: item.id.videoId,
                    videoTitle: item.snippet.title,
                    videoPubTime: item.snippet.publishTime,
                }).save();
            }
        } );
    
    }

    app.delete('/track/:id', async(req, res) => {


     
        const id = req.params.id;


        const User = mongoose.model('users');
        const Video = mongoose.model('videos');
        const curUser = await User.findOne({ googleId: req.user.googleId }, {
            'tracks': {$elemMatch: {'_id': id}}
        });
        const keyword = curUser.tracks[0].keyword;
        const track = await User.updateOne({ googleId: req.user.googleId }, {
            $pull: {
                'tracks': {
                    '_id': id
                }
            }
        });
    
        await Video.deleteMany({googleId: req.user.googleId, keyword: keyword});
        res.send();
    
    });

    app.get('/track', async (req, res) => {
        const User = mongoose.model('users');
        const curUser = await User.findOne(  { googleId: req.user.googleId});
        res.send(curUser.tracks);
    });

    app.post('/track/new', async (req, res) =>{

        const keyword = req.body.keyword;
    
        const User = mongoose.model('users');
        const exitUser = await User.findOne({
            'tracks':{
                $elemMatch:{
                    'keyword': keyword
                }
            }
        });
        if(!exitUser){
            await google.youtube('v3').search.list({
                key: keys.googleAPIKey,
                part: 'snippet',
                q: keyword,
                type: 'video',
                maxResults: 20,       
            }).then(async(response) => {
                await saveInfo(response.data.items, req.user.googleId, keyword).then(async() => {
                    const curUser = await User.findOne(  { googleId: req.user.googleId});
                    res.send(curUser.tracks[curUser.tracks.length - 1]);
        
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((e) => {
                console.log(e);
            });
        }
    });
}