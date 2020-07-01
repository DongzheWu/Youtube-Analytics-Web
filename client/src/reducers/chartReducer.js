import { CHART_DATA } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
      case CHART_DATA:
        return action.payload || false;
      default:
        return state;
    }
  }