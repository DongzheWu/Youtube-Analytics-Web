import { GET_TRACK, ADD_TRACK, DELETE_TRACK} from '../actions/types';

/** Set track state depending on get, add and delete operation from actions.*/
export default function(state = [], action) {
  switch (action.type) {
    case GET_TRACK:
      return action.payload || false;
    case ADD_TRACK:
      return [...state, action.payload];
    case DELETE_TRACK:
      return state.filter(element => element._id !== action.payload);
    default:
      return state;
  }
}