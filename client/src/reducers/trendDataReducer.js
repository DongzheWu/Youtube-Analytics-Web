import { GET_GTREND } from '../actions/types';

/** Set state to the trend data from actions.*/
export default function(state = {}, action) {
  if(action.type === GET_GTREND){
    return action.payload || false;
  }else{
    return state;
  }
}