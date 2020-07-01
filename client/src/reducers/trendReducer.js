import { ADD_TREND, DELETE_TREND}  from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_TREND:
      return [...state, action.payload];
    case DELETE_TREND:
      return state.filter(element => element != action.payload);
    default:
      return state;
  }
}