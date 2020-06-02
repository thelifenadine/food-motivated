import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
  numericSmall: {
    margin: theme.spacing(2),
    width: 55,
  },
  numericLarge: {
    margin: theme.spacing(2),
    width: 110,
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(0.5),
      fontSize: 11,
    },
  },
  inlineButtonText: {
    margin: theme.spacing(2),
    fontWeight: 300,
    fontSize: 15,
  },
  rmbOption: {
    margin: theme.spacing(2),
    width: 115,
    display: (props) => (props.rmbOption === 0) ? 'none' : 'inline-flex',
  },
  rmbCustom: {
    margin: theme.spacing(2),
    width: 135,
    display: (props) => (props.rmbOption === 0) ? 'inline-flex' : 'none',
  },
  firstRow: {
    fontWeight: 600,
  },
  lastRow: {
    borderBottom: '#fff solid 1px',
  },
}));

export default useStyles;