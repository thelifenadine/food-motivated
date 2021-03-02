import React from 'react';
import Section from '../layout/Section';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pTag: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  aTag: {
    color: theme.palette.secondary.dark,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}));

const Contact = () => {
  const classes = useStyles();
  return (
    <Section>
      <p className={classes.pTag}>Questions/Suggestions? Email: <a className={classes.aTag} href="mailto:rawdogfoodcalculator@gmail.com">rawdogfoodcalculator@gmail.com</a></p>
      <p className={classes.pTag}>New to Raw Feeding? Check out <a className={classes.aTag} href="https://perfectlyrawsome.com/" target="_blank" rel="noopener noreferrer">Perfectly Rawsome</a> for help getting started.</p>
    </Section>
  );
};

export default Contact;
