import React from "react";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import DogMealCalculator from './calculator/DogMealCalculator';
import theme from '../theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container fixed>
      <DogMealCalculator />
    </Container>
  </ThemeProvider>
);

export default App;
