import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { appInitOnce } from '../../actions/app';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const tabLocationMap = {
  '/home': 0,
  '/dashboard': 1,
  '/recipes': 2,
};

const Header = () => {
  const location = useLocation();
  const initialTabValue = tabLocationMap[location.pathname] || 0;
  const [value, setValue] = useState(initialTabValue);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickHandler = () => {
    dispatch(appInitOnce());
  };

  return (
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Home" to="/" component={Link} onClick={onClickHandler}/>
        <Tab label="Dashboard" to="/dashboard" component={Link} />
        <Tab label="Recipes"  to="/recipes" component={Link} />
      </Tabs>
    </AppBar>
  );
};

Header.propTypes = {
  value: PropTypes.string,
};

export default Header;