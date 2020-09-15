import React from 'react';
import Section from '../calculator/Section';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
      Questions/Suggestions? Email: <a className={classes.aTag} href="mailto:rawdogfoodcalculator@gmail.com">rawdogfoodcalculator@gmail.com</a>
    </Section>
  );
};

export default Contact;
