import { ADD_TREND, DELETE_TREND, GET_TOPICS}  from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_TOPICS:
      return  action.payload || false;
    case ADD_TREND:
      return [...state, action.payload];
    case DELETE_TREND:
      return state.filter(element => element != action.payload);
    default:
      return state;
  }
}