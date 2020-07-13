const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//-----------------------------------------------------
const bodyParser = require("body-parser");
const https = require("https");
const googleTrends = require('google-trends-api');
const {google} = require('googleapis');
const { WSAEDESTADDRREQ } = require('constants');
//--------------------------------------------
const cors = require('cors');
const { response } = require('express');

require('./models/User');
require('./models/Record');
require('./models/Video');
require('./models/Topic');
require('./services/passport');




mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(
    cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
//-------------------------------------------------------
// var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());

// var whitelist = ['http://localhost:3001', 'https://dongzhe-wu.netlify.app', '10.0.0.233']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// // Then pass them to cors:
// app.use(cors(corsOptions));
var count = 1;
function getAPIKey(){
    count++;
    count = count % 6;
    return keys.googleAPIKeys[count];
}

async function getInfo(items){
    var data = [];

    for(const item of items){
        await google.youtube('v3').videos.list({
            key: getAPIKey(),
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




    
app.post("/trend", function(req, res, next){
    var items = req.body.items;

    var length = req.body.length;
    var country = req.body.country;
    console.log(items);
    var dt = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    if(length == "7 days"){
        dt = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      }else if(length == "full"){
        dt = new Date('2004-01-01');
      }else if(length == "5 years"){
        dt = new Date(new Date().setFullYear(new Date().getFullYear() - 5));;
      }

    var ct = "";
    if(country == "USA"){
        ct = "US";
    }else if(country == "China"){
        ct = "CN";
    }else if(country == "Vietnam"){
        ct = "VN";
    }
    googleTrends.interestOverTime({
        keyword: items,
        startTime: dt,
        granularTimeResolution: true,
        geo: ct
    }, function(err, results, data){
        if(err){
            console.error('there was an error!', err);
        }else{

            var data = JSON.parse(results).default;
        
            // var date = [];
            // var value = [];
            var values = new Array(items.length);
            var date = []
            for(var k = 0; k < items.length; k++){
                values[k] = [];
            }
       
            data.timelineData.forEach(element => {
         
                date.push(element.formattedTime);
                for(var i = 0; i < element.value.length; i++){
                    values[i].push(element.value[i]);
                }
            });
       
   

            res.json({date: date, values: values, items: items});


            res.send()
        }
    });
});




// app.get("/bili", function(req, res, next){
//     axios.get('https://search.bilibili.com/all', {
//         params: {
//             keyword: "酸奶",
//             from_source: 'nav_suggest_new',
//         }
//     }).then(function(response){
//         console.log(response);
//     }).catch(function(error){
//         console.log(error);
//     });
// });
// all?keyword=%E9%85%B8%E5%A5%B6&from_source=nav_suggest_new'


// https://search.bilibili.com/all?keyword=%E9%85%B8%E5%A5%B6&from_source=nav_suggest_new




app.delete('/track/:id', async(req, res) => {
    console.log("call delete");
    const id = req.params.id;
    console.log(id);
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
            key: getAPIKey(),
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



  

const Video = mongoose.model('videos');



   

module.exports.timer = function(){
    
    var count = 1;
    function getAPIKey(){
        count++;
        count = count % 6;
        return keys.googleAPIKeys[count];
    }

    function getNewCount(){

        

        console.log("run");
        console.log("runrurnrurnrunrurnrurn");
        Video.find(function(err, videos){
            console.log("aaaaaaaaaa");
            console.log(err);
            console.log(videos);
            videos.forEach(async(video) => {
                console.log(video);
                if(video.recentViewCount){
                    await google.youtube('v3').videos.list({
                        key: getAPIKey(),
                        part: 'statistics',
                        id: video.videoId,
                    }).then(async(rep) => {
                        var dt = new Date();
                        await Video.updateOne({
                            googleId: video.googleId,
                            keyword: video.keyword,
                            videoId: video.videoId
                       
                        },
                        {
                            $push:{
                                values: rep.data.items[0].statistics.viewCount - video.recentViewCount,
                                redates: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
                            },
                            recentViewCount: rep.data.items[0].statistics.viewCount
        
                        });
                    });
                }else{
                    console.log("add recent view");
                    await google.youtube('v3').videos.list({
                        key: getAPIKey(),
                        part: 'statistics',
                        id: video.videoId,
                    }).then(async(rep) => {
                       video.recentViewCount =  rep.data.items[0].statistics.viewCount;
                       await video.save();
                    });
                }
    
    
            });
        }); 
        
    }
    console.log("start");
    getNewCount();
}





require('./routes/authRoutes')(app);
require('./routes/searchRoute')(app);
require('./routes/recordRoutes')(app);
require('./routes/topicRoutes')(app);
require('./routes/topRoute')(app);
require('./routes/timer')(app);



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path. resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);