

var count = 1;
function getAPIKey(){
    count++;
    count = count % 6;
    return keys.googleAPIKeys[count];
}

function timer(){

    const express = require('express');
    const mongoose = require('mongoose');
    const {google} = require('googleapis');
    const keys = require('./config/keys');

    const Video = mongoose.model('videos');
    console.log("run");
    console.log("runrurnrurnrunrurnrurn");
    Video.find(function(err, videos){
        videos.forEach(async(video) => {

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


setInterval(timer, 1000 * 60 * 5);
    
   

