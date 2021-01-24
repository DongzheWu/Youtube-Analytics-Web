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
        "Hong Kong": "HK",
        "Hungary": "HU",
        "India": "IN",
        "Indonesia": "ID",
        "Ireland": "IE",
        "Israel": "IL",
        "Italy": "IT",
        "Japan": "JP",
        "Kenya": "KE",
        "Malaysia": "MY",
        "Mexico": "MX",
        "Netherlands": "NL",
        "New Zealand": "NZ",
        "Nigeria": "NG",
        "Norway": "NO",
        "Philippines": "PH",
        "Poland": "PL",
        "Portugal": "PT",
        "Romania": "RO",
        "Russia": "RU",
        "Saudi Arabia": "SA",
        "Singapore": "SG",
        "South Africa": "ZA",
        "South Korea": "KR",
        "Sweden": "SE",
        "Switzerland": "CH",
        "Taiwan": "TW",
        "Thailand": "TH",
        "Turkey": "TR",
        "Ukarine": "UA",
        "United Kingdom": "GB"
        



    }

    app.post("/top", function(req, res){
        const country = req.body.country;
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