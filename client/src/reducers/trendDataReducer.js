import { GET_GTREND } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
      case GET_GTREND:
        return action.payload || false;
      default:
        return state;
    }
  }