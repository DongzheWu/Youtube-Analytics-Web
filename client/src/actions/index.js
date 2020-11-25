import axios from 'axios';
import { FETCH_USER, SEARCH_KEYWORD, GET_TRACK, ADD_TRACK, 
  DELETE_TRACK, SHOW_INFO, CHART_DATA, ADD_TREND, DELETE_TREND, GET_GTREND, GET_TOP, GET_TOPICS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchKeyword = values =>async dispatch => {
  values = values.searchKeyword;
  const res = await axios.post('/search', {term: values});
  dispatch({ type: SEARCH_KEYWORD, payload: res.data });
};

export const getTrack = () => async dispatch => {


  const res = await axios.get("/track");
 

  dispatch({ type: GET_TRACK, payload: res.data});
}

export const addTrack = track => async dispatch => {
  if(track){

    track = track.addTrack;
    const res = await  axios.post("/track/new", {keyword: track});

    dispatch({ type: ADD_TRACK, payload: res.data });
  }

}

export const deleteTrack = (id) => async dispatch => {

  await axios.delete(`/track/${id}`);
  dispatch({ type: DELETE_TRACK, payload: id });

};

export const showInfo = keyword => async dispatch => {

  const res = await axios.post("/videos", {keyword: keyword});

  dispatch({ type: SHOW_INFO, payload: res.data });
}

export const chartData = (values, redates) => dispatch => {
  // console.log("cahrtData");
  // console.log(values);
  // console.log(redates);
  dispatch({ type: CHART_DATA, payload: {values: values, redates: redates}});
}

export const timeSort = videos => dispatch => {
  videos.sort(function(a,b){
    return new Date(b.videoPubTime) - new Date(a.videoPubTime);
  });
  const sortVideos = [...videos];
  dispatch({ type: SHOW_INFO, payload: sortVideos });
  
}

export const viewCountSort = videos => dispatch => {
  videos.sort(function(a,b){
    return new Date(b.recentViewCount) - new Date(a.recentViewCount);
  });
  const sortVideos = [...videos];
  dispatch({ type: SHOW_INFO, payload: sortVideos });  
}

export const addTrend = trend => dispatch => {
  dispatch({ type: ADD_TREND, payload: trend.addTrend });

}

export const deleteTrend = trend => dispatch => {

  dispatch({ type: DELETE_TREND, payload: trend });

}

export const getGTrend = (trends, length, country) => async dispatch => {

  console.log(trends);
  console.log(length);
  const res = await axios.post("/trend", {items: trends, length: length, country: country});
  dispatch({ type: GET_GTREND, payload: res.data });
}

export const getTop = country => async dispatch => {
  const res = await axios.post("/top", {country: country});

  if(res.data.default){
    dispatch({ type: GET_TOP, payload: res.data.default.trendingSearchesDays[0] });
  }

}

export const saveTrend = items => async dispatch => {
  await axios.post("/topics", {items: items});
}

export const getTopics = () => async dispatch => {
  console.log("get topics");
  const res = await axios.get("/topics");
  console.log(res);
  dispatch({ type: GET_TOPICS, payload: res.data});
}