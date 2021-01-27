import { SEARCH_KEYWORD } from '../actions/types';

/** Set state to videos results of searched keyword from actions.*/
export default function(state = [], action) {
  if(action.type === SEARCH_KEYWORD){
    return action.payload || false;
  }else{
    return state;
  }
}