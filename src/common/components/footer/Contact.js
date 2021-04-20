import React from 'react';
import PropTypes from 'prop-types';
import { NativeSelect, makeStyles } from '@material-ui/core';
import { withLocalize } from 'react-localize-redux';
import { saveLanguage } from '../../localStorage/selectedLanguage';
import Section from '../layout/Section';
import { Translate } from 'react-localize-redux';

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
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: 0,
  },
}));

const Contact = ({ languages, activeLanguage, setActiveLanguage }) => {
  const classes = useStyles();

  const updateLanguage = (languageCode) => {
    saveLanguage(languageCode);
    setActiveLanguage(languageCode);
  };

  return (
    <Translate>
      {({ translate }) => (
        <React.Fragment>
          <Section>
            <p className={classes.pTag}>Questions/Suggestions? Email: <a className={classes.aTag} href="mailto:rawdogfoodcalculator@gmail.com">rawdogfoodcalculator@gmail.com</a></p>
            <p className={classes.pTag}>New to Raw Feeding? Check out <a className={classes.aTag} href="https://perfectlyrawsome.com/" target="_blank" rel="noopener noreferrer">Perfectly Rawsome</a> for help getting started.</p>
          </Section>
          <Section>
            <p className={classes.pTag}>Language / {translate(`languages.language-hebrew`)} / {translate(`languages.language-german`)}</p>
            <div className={classes.formControl}>
              <NativeSelect
                name="language"
                id="language"
                data-testid="language"
                onChange={(e) => updateLanguage(e.target.value)}
                value={activeLanguage.code}
              >
                {languages.map(lang => (
                  <option value={lang.code} key={lang.code}>
                    {translate(`languages.${lang.code}`)}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </Section>
        </React.Fragment>
      )}
    </Translate>
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
