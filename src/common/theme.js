import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#98ee99',
      main: '#66bb6a',
      dark: '#338a3e',
      contrastText: '#212121',
    },
  },
});

export default theme;