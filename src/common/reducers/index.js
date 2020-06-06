import { combineReducers } from 'redux';
import app from './app';
import calculator from './calculator';

export default combineReducers({
  app,
  calculator,
});