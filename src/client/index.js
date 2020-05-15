// import 'typeface-roboto';

import React, { useEffect } from "react";
import { hydrate } from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore from '../common/configureStore';
import App from "../common/components/App";
import theme from '../common/theme';

const store = configureStore(window.__INITIAL_DATA__);

const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

const renderApp = () => hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>, 
  document.getElementById("app")
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp);
}

renderApp();