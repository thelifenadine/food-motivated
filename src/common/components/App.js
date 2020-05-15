import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './header/Header';
import DogCalculator from './calculator/DogCalculator';
import theme from '../theme';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container fixed disableGutters>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/calculator">
              <DogCalculator />
            </Route>
            <NotFound default />
          </Switch>
        </Container>
      </ThemeProvider>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h2>Welcome to my raw feeding calculator!</h2>
    </div>
  );
};

const NotFound = () => <div>oh sorry, nothing here</div>;

export default App;
