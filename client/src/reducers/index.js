import { combineReducers } from 'redux';
import { reducer as searchForm } from 'redux-form';
import { reducer as trackForm} from 'redux-form';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import trackReducer from './trackReducer';
import infoReducer from './infoReducer';
import chartReducer from './chartReducer';
import trendReducer from './trendReducer';
import trendDataReducer from './trendDataReducer';
import topReducer from './topReducer';

export default combineReducers({
  auth: authReducer,
  form: searchForm,
  trackForm: trackForm,
  search: searchReducer,
  tracks: trackReducer,
  info: infoReducer,
  lineChartData: chartReducer,
  trends: trendReducer,
  gtrendsData: trendDataReducer,
  topData: topReducer
});
