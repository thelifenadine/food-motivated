import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './header/Header';
import DogMealCalculator from './calculator/DogMealCalculator';
import theme from '../theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <Container fixed>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calculator">
          <DogMealCalculator />
        </Route>
        <NotFound default />
      </Switch>
    </Container>
  </ThemeProvider>
);

const Home = () => {
  return (
    <div>
      <h2>Welcome to my raw feeding calculator!</h2>
    </div>
  );
};

const NotFound = () => <div>oh sorry, nothing here</div>;

export default App;
