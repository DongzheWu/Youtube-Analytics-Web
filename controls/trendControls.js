"use strict";
const googleTrends = require('google-trends-api');

/** 
 * @param {string} range
 * @param {string} country
 * @param {array} items
 * @return {object} 
 * */
const checkTrend = async function(range, country, items){
  //Call google Trend API to get trend data of keywords
  const setting = checkSetting(range, country);

  try{
    const results = await googleTrends.interestOverTime({
      keyword: items,
      startTime: setting.dt,
      granularTimeResolution: true,
      geo: setting.ct
    });

    let data = JSON.parse(results).default;
    let values = new Array(items.length);
    let date = [];
    for(let k = 0; k < items.length; k++){
      values[k] = [];
    }
    //Sort out Trend Data
    data.timelineData.forEach(element => {
        date.push(element.formattedTime);
        for(var i = 0; i < element.value.length; i++){
            values[i].push(element.value[i]);
        }
    });

    return {date: date, values: values, items: items};
  }catch(e){
    console.log(e);
    return {};
  }
}

/** 
 * @param {string} range
 * @param {string} country
 * @return {object} 
 * */
const checkSetting = function(range, country){
  //Convert selected date range and country.
  let dt = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  if(range == "7 DAYS"){
      dt = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }else if(range == "FULL"){
      dt = new Date('2004-01-01');
    }else if(range == "5 YEARS"){
      dt = new Date(new Date().setFullYear(new Date().getFullYear() - 5));
    }

  let ct = "";
  if(country == "USA"){
      ct = "US";
  }else if(country == "China"){
      ct = "CN";
  }else if(country == "Vietnam"){
      ct = "VN";
  }
  return {dt: dt, ct: ct};
}

const trendControls = {
  checkTrend
}
module.exports = trendControls;