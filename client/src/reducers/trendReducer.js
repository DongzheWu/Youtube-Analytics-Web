import { ADD_TREND, DELETE_TREND, GET_TOPICS}  from '../actions/types';

/** Set trend keywords list depending on get, add and delete operation from actions.*/
export default function(state = [], action) {
  switch (action.type) {
    case GET_TOPICS:
      return  action.payload || false;
    case ADD_TREND:
      return [...state, action.payload];
    case DELETE_TREND:
      return state.filter(element => element.topicId !== action.payload);
    default:
      return state;
  }
}