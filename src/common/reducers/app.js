import createMappedReducer from './utils/createMappedReducer';
import { APP_INIT } from '../actions/app';

const initialState = {
  isInitialized: false,
};

export default createMappedReducer(initialState, {
  [APP_INIT]() {
    return {
      isInitialized: true,
    };
  },
});