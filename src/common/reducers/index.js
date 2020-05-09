import { combineReducers } from 'redux';
import recipes from './recipes';
import app from './app';

export default combineReducers({
  app,
  recipes,
});