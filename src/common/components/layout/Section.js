import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const Section = props => {
  const classes = useStyles();

  return (<div className={classes.section} {...props} />);
};

export default Section;
