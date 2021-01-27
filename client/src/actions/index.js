import axios from 'axios';
import { FETCH_USER, SEARCH_KEYWORD, GET_TRACK, ADD_TRACK, 
  DELETE_TRACK, SHOW_INFO, CHART_DATA, ADD_TREND, DELETE_TREND, GET_GTREND, GET_TOP, GET_TOPICS } from './types';

/** Fetch current user info from server and send it to reducer.*/
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

/** Fetch vidoes info related to searchKeyword and send it to reducer.*/
export const searchKeyword = values =>async dispatch => {
  values = values.searchKeyword;
  const res = await axios.post('/search', {term: values});
  dispatch({ type: SEARCH_KEYWORD, payload: res.data });
};

/** Fetch track topics from server and send it to reducer.*/
export const getTrack = () => async dispatch => {
  const res = await axios.get("/track");
  dispatch({ type: GET_TRACK, payload: res.data});
}

/** Add a new track topic to server and send result to reducer.*/
export const addTrack = track => async dispatch => {
  if(track){
    track = track.addTrack;
    const res = await  axios.post("/track", {keyword: track});
    dispatch({ type: ADD_TRACK, payload: res.data });
  }
}

/** Delete a track topic from server and send result to reducer.*/
export const deleteTrack = (id) => async dispatch => {
  await axios.delete(`/track/${id}`);
  dispatch({ type: DELETE_TRACK, payload: id });
};

/** Get videos information and send result to reducer.*/
export const showInfo = keyword => async dispatch => {
  const res = await axios.post("/videos", {keyword: keyword});
  dispatch({ type: SHOW_INFO, payload: res.data });
}

/** Send line chart data to reducer.*/
export const chartData = (values, redates) => dispatch => {
  dispatch({ type: CHART_DATA, payload: {values: values, redates: redates}});
}

/** Sort videos by time and send the array to reducer.*/
export const timeSort = videos => dispatch => {
  videos.sort(function(a,b){
    return new Date(b.videoPubTime) - new Date(a.videoPubTime);
  });
  const sortVideos = [...videos];
  dispatch({ type: SHOW_INFO, payload: sortVideos });
  
}

/** Sort videos by view count and send the array to reducer.*/
export const viewCountSort = videos => dispatch => {
  videos.sort(function(a,b){
    return new Date(b.recentViewCount) - new Date(a.recentViewCount);
  });
  const sortVideos = [...videos];
  dispatch({ type: SHOW_INFO, payload: sortVideos });  
}

/** Add a new trend topic and send result to to reducer.*/
export const addTrend = trend => async dispatch => {
  const res = await axios.post("/topics", {topic: trend.addTrend});
  dispatch({ type: ADD_TREND, payload: res.data });
}

/** Delete a new trend topic and send result to to reducer.*/
export const deleteTrend = topicId => async dispatch => {
  await axios.delete(`/topics/${topicId}`);
  dispatch({ type: DELETE_TREND, payload: topicId });

}

/** Get trend data of topics and send result to to reducer.*/
export const getGTrend = (trends, range, country) => async dispatch => {
  const res = await axios.post("/trend", {items: trends, range: range, country: country});
  dispatch({ type: GET_GTREND, payload: res.data });
}

/** Get hot topics of specific countris and send result to to reducer.*/
export const getTop = country => async dispatch => {
  const res = await axios.post("/top", {country: country});
  if(res.data.default){
    dispatch({ type: GET_TOP, payload: res.data.default.trendingSearchesDays[0] });
  }

}
/** Get trend topics and send result to to reducer.*/
export const getTopics = () => async dispatch => {
  const res = await axios.get("/topics");
  dispatch({ type: GET_TOPICS, payload: res.data});
}