import { CHART_DATA } from '../actions/types';

/** Set line chart data from actions*/
export default function(state = {}, action) {
  if(action.type === CHART_DATA){
    return action.payload || false;
  }else{
    return state;
  }
}