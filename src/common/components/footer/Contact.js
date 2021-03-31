import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { saveLanguage } from '../../localStorage/selectedLanguage';

import Section from '../layout/Section';
import { makeStyles } from '@material-ui/core';
// FormControl, NativeSelect, InputLabel,
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

const Contact = ({ languages, activeLanguage, setActiveLanguage }) => {
  const classes = useStyles();

  const updateLanguage = (languageCode) => {
    saveLanguage(languageCode);
    setActiveLanguage(languageCode);
  };

  return (
    <Section>
      <p className={classes.pTag}>Questions/Suggestions? Email: <a className={classes.aTag} href="mailto:rawdogfoodcalculator@gmail.com">rawdogfoodcalculator@gmail.com</a></p>
      <p className={classes.pTag}>New to Raw Feeding? Check out <a className={classes.aTag} href="https://perfectlyrawsome.com/" target="_blank" rel="noopener noreferrer">Perfectly Rawsome</a> for help getting started.</p>
      <p>Current Language: {activeLanguage.name}</p>
      <ul className="selector">
        {languages.map(lang => (
          <li key={lang.code}>
            <button onClick={() => updateLanguage(lang.code)}>
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

Contact.propTypes = {
  languages: PropTypes.array.isRequired,
  activeLanguage: PropTypes.object,
  setActiveLanguage: PropTypes.func.isRequired,
};

Contact.defaultProps = {
  activeLanguage: {
    name: 'English',
  },
};

export default withLocalize(Contact);
