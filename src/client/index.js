import React from "react";
import { hydrate } from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore from '../common/configureStore';
import App from "../common/components/App";
import theme from '../common/theme';

const store = configureStore(window.__INITIAL_DATA__);
delete window.__INITIAL_DATA__;

const jssStyles = document.querySelector('#jss-server-side');
if (jssStyles) {
  jssStyles.parentElement.removeChild(jssStyles);
}

const initialState = document.querySelector('#initial-state');
if (initialState) {
  initialState.parentElement.removeChild(initialState);
}
const renderApp = () => hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>, 
  document.getElementById("app")
);

renderApp();