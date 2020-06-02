import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  h2: {
    fontWeight: 400,
    margin: theme.spacing(2),
  },
}));

const Header2 = ({ children }) => {
  const classes = useStyles();

  return (
    <Box component="h2" className={classes.h2} pt={1}>{children}</Box>
  );
};

Header2.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header2;
