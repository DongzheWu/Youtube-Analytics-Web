import { GET_TRACK, ADD_TRACK, DELETE_TRACK} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRACK:
      return action.payload || false;
    case ADD_TRACK:
      var abc = [...state, action.payload];
      return [...state, action.payload];
    case DELETE_TRACK:
      return state.filter(element => element._id !== action.payload);
    default:
      return state;
  }
}