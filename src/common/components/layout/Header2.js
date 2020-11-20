import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  h2: {
    fontWeight: 400,
    margin: theme.spacing(1),
  },
}));

const Header2 = ({ children }) => {
  const classes = useStyles();

  return (
    <h2 className={classes.h2}>{children}</h2>
  );
};

Header2.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header2;
