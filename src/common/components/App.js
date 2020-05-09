import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './header/Header';
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
            <Route path="/dashboard">
              <Dashboard/>
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
      <h2>Welcome HOME</h2>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

const NotFound = () => <div>Sorry, nothing here</div>;

export default App;
