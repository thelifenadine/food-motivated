import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  const middleware = [thunkMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger').createLogger;
    middleware.push(createLogger({ collapsed: true }));
  }

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}