import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#000000',
    },
    secondary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff',
    },
  },
});

export default theme;