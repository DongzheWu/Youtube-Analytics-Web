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


require('./models/User');
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
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});





const PORT = process.env.PORT || 5000;
app.listen(PORT);