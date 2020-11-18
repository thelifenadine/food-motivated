import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button,
  InputAdornment, TextField, makeStyles
} from '@material-ui/core';
import {
  updateBonePercentage,
  updateOtherPercentage,
  setLifestagePreset,
  setMealType,
} from '../../actions/calculator';
import { adult, puppy } from '../../constants/lifestage';
import validateInteger from '../../utils/validateFloat';

import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  numericSmall: {
    margin: theme.spacing(1),
    width: 55,
  },
  radioWrapper: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  radio: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  radioLabel: {
    fontSize: 14,
    marginRight: theme.spacing(1),
  },
  formLabel: {
    fontSize: 14,
    marginBottom: theme.spacing(1),
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(0.5),
    },
  },
}));

const PercentageOptions = ({
  actions,
  otherPercentages,
  musclePercentage,
  bonePercentage,
  lifestagePreset,
  mealType,
}) => {
  const classes = useStyles();
  return (
    <Section>
      <Header2>Percentages</Header2>
      <div className={classes.radioWrapper}>
        <FormControl component="fieldset" margin="none" variant="outlined">
          <FormLabel component="legend" classes={{ root: classes.formLabel }}>Meal Type</FormLabel>
          <RadioGroup
            value={mealType} aria-label={mealType} name="mealType-radios"
            onChange={(e) => actions.setMealType(e.target.value)}
            row
          >
            <FormControlLabel
              label="BARF"
              value="barf"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="4"
            />
            <FormControlLabel
              label="PMR"
              value="pmr"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="5"
            />
            <FormControlLabel
              label="Traditional BARF"
              value="barf-traditional"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="6"
            />
            <FormControlLabel
              label="Traditional PMR"
              value="pmr-traditional"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="7"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.buttonWrapper}>
        <span>Lifestage Preset:</span>
        <Button
          size="small"
          color="secondary"
          variant={(lifestagePreset === adult) ? "contained" : "outlined"}
          onClick={() => actions.setLifestagePreset(adult)}
          tabIndex="8"
        >
          Adult
        </Button>
        <Button
          size="small"
          color="secondary"
          variant={(lifestagePreset === puppy) ? "contained" : "outlined"}
          onClick={() => actions.setLifestagePreset(puppy)}
          tabIndex="9"
        >
          Puppy
        </Button>
      </div>
      <TextField
        className={classes.numericSmall}
        id="musclePercentage"
        label="Muscle"
        value={musclePercentage}
        type="number"
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        tabIndex="10"
        className={classes.numericSmall}
        id="bonePercentage"
        label="Bone"
        value={bonePercentage}
        type="number"
        onChange={e => actions.updateBonePercentage(validateInteger(e.target.value))}
        onFocus={(event) => event.target.select()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      {map(otherPercentages, (value, key) => (
        <TextField
          tabIndex="11"
          className={classes.numericSmall}
          id={`${key}Percentage`}
          key={`${key}Percentage`}
          label={key}
          value={value}
          type="number"
          onChange={e => actions.updateOtherPercentage(validateInteger(e.target.value), key)}
          onFocus={(event) => event.target.select()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            ),
          }}
        />
      ))}
    </Section>
  );
};

PercentageOptions.propTypes = {
  actions: PropTypes.object.isRequired,
  otherPercentages: PropTypes.object.isRequired,
  musclePercentage: PropTypes.number.isRequired,
  bonePercentage: PropTypes.number.isRequired,
  mealType: PropTypes.string.isRequired,
  lifestagePreset: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setMealType,
      setLifestagePreset,
      updateBonePercentage,
      updateOtherPercentage,
    }, dispatch),
  };
}

export function mapStateToProps({ calculator = {} }) {
  return {
    otherPercentages: calculator.otherPercentages,
    musclePercentage: calculator.musclePercentage,
    bonePercentage: calculator.bonePercentage,
    lifestagePreset: calculator.lifestagePreset,
    mealType: calculator.mealType,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PercentageOptions);
