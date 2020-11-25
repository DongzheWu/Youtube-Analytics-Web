const googleTrends = require('google-trends-api');
module.exports = app => {
    app.post("/trend", function(req, res, next){
        var items = req.body.items;
    
        var length = req.body.length;
        var country = req.body.country;
        var dt = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        if(length == "7 DAYS"){
            dt = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          }else if(length == "FULL"){
            dt = new Date('2004-01-01');
          }else if(length == "5 YEARS"){
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
}