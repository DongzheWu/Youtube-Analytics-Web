import { GET_TOP } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
      case GET_TOP:
        return action.payload || false;
      default:
        return state;
    }
  }