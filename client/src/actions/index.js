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
    const res = await  axios.post("/track", {keyword: track});

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

export const addTrend = trend => async dispatch => {

  const res = await axios.post("/topics", {topic: trend.addTrend});

  dispatch({ type: ADD_TREND, payload: res.data });

}

export const deleteTrend = topicId => async dispatch => {

  await axios.delete(`/topics/${topicId}`);
  dispatch({ type: DELETE_TREND, payload: topicId });

}

export const getGTrend = (trends, length, country) => async dispatch => {

  const res = await axios.post("/trend", {items: trends, length: length, country: country});
  dispatch({ type: GET_GTREND, payload: res.data });
}

export const getTop = country => async dispatch => {
  const res = await axios.post("/top", {country: country});

  if(res.data.default){
    dispatch({ type: GET_TOP, payload: res.data.default.trendingSearchesDays[0] });
  }

}


export const getTopics = () => async dispatch => {
  const res = await axios.get("/topics");
  dispatch({ type: GET_TOPICS, payload: res.data});
}