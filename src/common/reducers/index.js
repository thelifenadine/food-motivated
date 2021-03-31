import { combineReducers } from 'redux';
import { localizeReducer } from 'react-localize-redux';

import calculator from './calculator';

export default combineReducers({
  calculator,
  localize: localizeReducer,
});
