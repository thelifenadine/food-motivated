import React from "react";
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from "react-dom/server";
import { CssBaseline, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { withLocalize } from 'react-localize-redux';
import globalTranslations from '../translations/global.json';
import { loadLanguage } from '../localStorage/selectedLanguage';

import Main from './calculator/Main';
import theme from '../theme';

class App extends React.Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Hebrew', code: 'he' }
      ],
      translation: globalTranslations,
      options: {
        defaultLanguage: loadLanguage(),
        renderToStaticMarkup,
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed>
          <Main />
        </Container>
      </ThemeProvider>
    );
  }
}

export default withLocalize(App);
