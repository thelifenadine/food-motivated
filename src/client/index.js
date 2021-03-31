import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { LocalizeProvider } from 'react-localize-redux';

import configureStore from '../common/configureStore';
import App from "../common/components/App";
import theme from '../common/theme';

const store = configureStore({});

const renderApp = () => render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizeProvider>
  </Provider>,
  document.getElementById("app")
);

renderApp();
