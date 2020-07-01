const googleTrends = require('google-trends-api');
module.exports = app => {
    const countryAbb = {
        "China": "CN",
        "Vietnam": "VN",
        "United States of America": "US",
        "Brazil": "BR",
        "Argentina": "AR",
        "Austria": "AT",
        "Belgium": "BE",
        "Canada": "CA",
        "Chile": "CL",
        "Colombia": "CO",
        "Czechia": "CZ",
        "Denmark": "DK",
        "Egypt": "EG",
        "Finland": "FI",
        "France": "FR",
        "Germany": "DE",
        "Greece": "GR",
        "Hong Kong": "HK"
    }

    app.post("/top", function(req, res){
        country = req.body.country;
        console.log(countryAbb[country]);
        googleTrends.dailyTrends({
            trendDate: new Date(Date.now()),
            geo: countryAbb[country],
          }, function(err, results) {
            if (err) {
              console.log(err);
            }else{
              res.send(results);
            }
          });

    });


};