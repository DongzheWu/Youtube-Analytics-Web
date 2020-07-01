import { SEARCH_KEYWORD } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SEARCH_KEYWORD:
      return action.payload || false;
    default:
      return state;
  }
}