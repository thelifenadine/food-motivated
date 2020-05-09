import express from "express";
import cors from "cors";
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import configureStore from '../common/configureStore';
import renderFullPage from './renderFullPage';
import App from '../common/components/App';
import theme from '../common/theme';

const app = express();

app.use(cors());

// serve up the dist folder since that's where our client app.bundle.js file will end up.
app.use(express.static("dist"));

app.get("/*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const store = configureStore();

  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        { 
          sheets.collect(
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          )
        }
      </StaticRouter>
    </Provider>
  );
  const css = sheets.toString();
  const initialState = store.getState();
  res.send(renderFullPage(markup, initialState, css));
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});