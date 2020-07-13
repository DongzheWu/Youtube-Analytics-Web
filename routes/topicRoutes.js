const mongoose = require('mongoose');
const googleTrends = require('google-trends-api');

module.exports = app => {
    
    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
    
    function indexOfMin(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var min = arr[0];
        var mminIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }
    
        return minIndex;
    }
    
    async function calRank(items, max){
        var count = 0;
        for(var num = items.length - 5; num > 4; num = num - 4){
            var remains = items.slice(5 + count * 4, 5 + count * 4 + 4);
            remains.push(max);
            await googleTrends.interestOverTime({
                keyword: remains,
                startTime:new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            }, function(err, results){
                if(err){
                    console.error('there was an error!', err);
                }else{
                    var data = JSON.parse(results).default;
                    var arr = data.timelineData[data.timelineData.length - 1].value;
                    max = remains[indexOfMax(arr)];
                    console.log("xunhuan");
                    console.log(remains);
                    console.log(max);
    
                }
    
    
            });
        }
        var last = items.slice(items.length - num, items.length);
        last.push(max);
        console.log("last num");
        console.log(num);
        console.log(max);
        await googleTrends.interestOverTime({
            keyword: last,
            startTime:new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        }, function(err, results){
            if(err){
                console.error('there was an error!', err);
            }else{
                var data = JSON.parse(results).default;
                var arr = data.timelineData[data.timelineData.length - 1].value;
                max = last[indexOfMax(arr)];
                console.log("max!!!!!");
                console.log(last);
                console.log(max);
                
    
            }
    
    
        });
        return max;
    
        
    }

    app.get("/topics", async function(req, res){
        const Topic = mongoose.model('topics');
        curTopic = await Topic.findOne({ googleId: req.user.googleId});
        console.log(curTopic);
        res.send(curTopic.topicList);
    });
    
    app.post("/topics", async function(req, res){
        var items =　req.body.items;
        console.log("rank....");
        console.log(items);
        var n = items.length;
        var min;
        var max;
        mongoose.set('useFindAndModify', false);
    
        if(n <= 5 && n > 0){
            googleTrends.interestOverTime({
                keyword: items,
                startTime:new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
                granularTimeResolution: true
            }, async function(err, results){
                if(err){
                    console.error('there was an error!', err);
                }else{
                    var data = JSON.parse(results).default;
    
                    console.log(data.timelineData);
                    console.log(data.timelineData[data.timelineData.length - 1].value);
                    var arr = data.timelineData[data.timelineData.length - 1].value;
                    list = [];
                    for(var i = 0; i < arr.length; i++){
                        list.push({
                            "item": items[i],
                            "value": arr[i]
                        })
                    }
                    list.sort((a, b) => (a.value < b.value) ? 1 : -1);
    
                    const Topic = mongoose.model('topics');
                    curTopic = await Topic.findOneAndUpdate(  { googleId: req.user.googleId}, {
                        topicList: items,
                        topTopic: list[0].item
                    });
                    if(!curTopic){
                        await new Topic({
                            googleId: req.user.googleId,
                            topicList: items,
                            topTopic: list[0].item,    
                        }).save();
                        res.send();
                    }else{
                        res.send();
                    }
       
                }
            });
        }else if(n >5){
            var firstFive = items.slice(0, 5);
            console.log("items");
            console.log(items);
            googleTrends.interestOverTime({
                keyword: firstFive,
                startTime:new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            }, async function(err, results){
                if(err){
                    console.error('there was an error!', err);
                }else{
                    var data = JSON.parse(results).default;
    
      
                    var arr = data.timelineData[data.timelineData.length - 1].value;
                    
    
                    max = firstFive[indexOfMax(arr)];
    
                    await calRank(items, max).then(async(maxItem) =>{
                        console.log("zui hou");
                        console.log(maxItem);
                        const Topic = mongoose.model('topics');
                        curTopic = await Topic.findOneAndUpdate(  { googleId: req.user.googleId}, {
                            topicList: items,
                            topTopic: maxItem
                        });
                        if(!curTopic){
                            await new Topic({
                                googleId: req.user.googleId,
                                topicList: items,
                                topTopic: maxItem,    
                            }).save();
                            res.send();
                        }else{
                            res.send();
                        }
    
                       
                    });
    
                }
            });
        }else{
            const Topic = mongoose.model('topics');
            curTopic = await Topic.findOneAndUpdate(  { googleId: req.user.googleId}, {
                topicList: items,
                topTopic: ''
            });
            if(!curTopic){
                await new Topic({
                    googleId: req.user.googleId,
                    topicList: items, 
                    
                }).save();
                res.send();
            }else{
                res.send();
            }
        }
      
    
        
    
    });
}