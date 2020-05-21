import { makeStyles } from '@material-ui/core';

// clean this up
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
  },
  formControlWide: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  numericSmall: {
    width: 55,
    margin: theme.spacing(1),
  },
  numericMed: {
    width: 65,
    margin: theme.spacing(1),
  },
  numericLarge: {
    width: 110,
    margin: theme.spacing(1),
  },
  nativeSelect: {
    fontWeight: 'fontWeightLight',
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  hidden: {
    display: 'none',
  }, 
  table: {
    borderBottom: '#eee solid 1px',
  },
  lastRow: {
    borderBottom: '#fff solid 1px',
  },
}));

export default useStyles;