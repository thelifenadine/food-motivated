import React from "react";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './calculator/Main';
import theme from '../theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container fixed>
      <Main />
    </Container>
  </ThemeProvider>
);

export default App;
