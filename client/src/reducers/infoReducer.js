import { SHOW_INFO } from '../actions/types';
import { TIME_SORT } from '../actions/types';

/** Set state to video info from actions. */
export default function(state = [], action) {
  switch (action.type) {
    case SHOW_INFO:
      return action.payload || false;
    case TIME_SORT:
      return action.payload;
    default:
      return state;
  }
}