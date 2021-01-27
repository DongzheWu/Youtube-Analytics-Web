import { FETCH_USER } from '../actions/types';

/** Set state to user information.*/
export default function(state = null, action) {
  if(action.type === FETCH_USER){
    return action.payload || false;
  }else{
    return state;
  }
}
