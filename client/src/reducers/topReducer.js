import { GET_TOP } from '../actions/types';

/** Set the state top topics of the clicked country from actions.*/
export default function(state = {}, action) {
  if(action.type === GET_TOP){
    return action.payload || false;
  }else{
    return state;
  }
}