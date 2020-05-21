import { combineReducers } from 'redux';
import animal from './animal';
import app from './app';

export default combineReducers({
  app,
  animal,
});