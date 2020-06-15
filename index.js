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


require('./models/User');
require('./models/TrackList');
require('./models/Record');
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


// app.use(cors());

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


async function getInfo(items){
    var data = [];

    for(const item of items){
        await google.youtube('v3').videos.list({
            key: keys.googleAPIKey,
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
    console.log(req);
    console.log(req.body.term);

    google.youtube('v3').search.list({
        key: keys.googleAPIKey,
        part: 'snippet',
        q: req.body.term,
        type: 'video',
        maxResults: 3,
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



    
app.post("/", function(req, res, next){
    var item = req.body.item1;
    googleTrends.interestOverTime({
        keyword: item,
        startTime: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
        granularTimeResolution: true,
    }, function(err, results, data){
        if(err){
            console.error('there was an error!', err);
        }else{
            var data = JSON.parse(results).default;
            
            var date = [];
            var value = [];
       
            data.timelineData.forEach(element => {
                date.push(element.formattedTime);
                value.push(element.value[0]);
            });
            console.log(date);
            console.log(value);
            // const trend = new Trend({
            //     keyword: item,
            //     timeType: "5 years",
            //     date: date,
            //     value: value,
            // });
            // trend.save();

            res.json({date: date, value: value});



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



//----------------------------------------------------------
app.get('/track', async (req, res) => {
    console.log(req.user);
    const User = mongoose.model('users');
 

    // await User.updateOne(
    //     { googleId: req.user.googleId },
    //     { $push: {trackList: "粽子", dateList: Date.now()} }
    // )

    // console.log(chagedUser);
    // const track = await new Track({ 
    //     googleId: profile.id 
    // })
    // track.save();

});


async function saveInfo(items, googleId, keyword){
    var videoIds = [];
    var videoTitles = [];
    var videoPubTimes = []; 

    items.forEach(item => {
        videoIds.push(item.id.videoId);
        videoTitles.push(item.snippet.title);
        videoPubTimes.push(item.snippet.publishTime);
    });

    const Track = mongoose.model('tracks');
    console.log(googleId);
    await new Track({
        googleId: googleId,
        keyword: keyword,
        videoIds: videoIds,
        videoTitles: videoTitles,
        videoPubTimes: videoPubTimes
    }).save();

}

app.get('/track/new', async(req, res) => {
    var keyword = "酸奶";

    const User = mongoose.model('users');

    if(!req.user){
        console.log("nonono");
    }else{
        await User.find(  { googleId: req.user.googleId,  trackList: { $in: [ keyword ] } }, async(err, result) => {
            if (err) {
                console.log(err);
              } else {
                  console.log("add one item");
                if(result.length == 0){
                    await User.updateOne(
                        { googleId: req.user.googleId },
                        { $push: {trackList: keyword, dateList: Date.now()} }
                    )

                    // const Track = mongoose.model('tracks');
                    google.youtube('v3').search.list({
                        key: keys.googleAPIKey,
                        part: 'snippet',
                        q: keyword,
                        type: 'video',
                        maxResults: 5,
                        }).then((response) => {
                            saveInfo(response.data.items, req.user.googleId, keyword).catch((e) => {
                                console.log(e);
                            });


                        }).catch((err) => {
                            console.log(err);
                        });

                }
     
              }
        } );
        
    }

})



function intervalFunc() {
    const Track = mongoose.model('tracks');
    const Record = mongoose.model('records');
    console.log("11111111111");
    Track.find(function(err, res){
        res.forEach((item) => {
            item.videoIds.forEach((videoId) => {
                Record.find({
                    googleId: item.googleId,
                    keyword: item.keyword,
                    videoId: videoId
                }, async(e, records) => {
                    if(records.length == 0){
                        console.log("new record");
                        await google.youtube('v3').videos.list({
                            key: keys.googleAPIKey,
                            part: 'snippet,statistics',
                            id: videoId,
                        }).then((rep) => {
                            new Record({
                                googleId: item.googleId,
                                keyword: item.keyword,
                                videoId: videoId,
                                title: rep.data.items[0].snippet.title,
                                tags: rep.data.items[0].snippet.tags,
                                values: [rep.data.items[0].statistics.viewCount],
                                redates: [Date.now()]
                            }).save();
            
                        }).catch((err) => {
                            console.log(err);
                        });
                    }else{
                        console.log("old record");
                        await google.youtube('v3').videos.list({
                            key: keys.googleAPIKey,
                            part: 'statistics',
                            id: videoId,
                        }).then((rep) => {
                            console.log(Date.now());
                            console.log(rep.data.items[0].statistics.viewCount);
                            console.log(videoId);
                            Record.updateOne(
                                {
                                    googleId: item.googleId,
                                    keyword: item.keyword,
                                    videoId: videoId,
                                },
                                {
                                    $push: {
                                        values: rep.data.items[0].statistics.viewCount,
                                        redates: Date.now()
                                    },
                                },
    
                                (err) =>{
                                    if(err){
                                        console.log(err);
                                    }
                                }
    
                            );
    
                        }).catch((err) => {
                            console.log(err);
                        });
    
    
    
                    }
                });
            });
            console.log(item.videoIds);
    
        });
    });
}
  
setInterval(intervalFunc, 1000 * 60);






require('./routes/authRoutes')(app);

// app.get('/', (req, res) => {
//     res.send({ hi: 'there'});
//     const User = mongoose.model('users');
 

//     await User.updateOne(
//         { googleId: req.user.googleId },
//         { $push: {trackList: "粽子", dateList: Date.now()} }
//     )
// });





const PORT = process.env.PORT || 5000;
app.listen(PORT);