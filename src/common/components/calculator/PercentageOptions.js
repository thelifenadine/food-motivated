import map from 'lodash/map';
import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
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
import validateInteger from '../../utils/validateInteger';

import Header2 from '../layout/Header2';
import Section from '../layout/Section';

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

const PercentageOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    otherPercentages, musclePercentage, bonePercentage, lifestagePreset, mealType,
  } = useSelector(({ calculator }) => ({
    otherPercentages: calculator.otherPercentages,
    musclePercentage: calculator.musclePercentage,
    bonePercentage: calculator.bonePercentage,
    lifestagePreset: calculator.lifestagePreset,
    mealType: calculator.mealType,
  }), shallowEqual);

  let otherStartIndex = 10;

  return (
    <Section>
      <Header2>Percentages</Header2>
      <div className={classes.radioWrapper}>
        <FormControl component="fieldset" margin="none" variant="outlined">
          <FormLabel component="legend" classes={{ root: classes.formLabel }}>Meal Type</FormLabel>
          <RadioGroup
            data-testid="mealTypeRadioGroup"
            value={mealType} aria-label={mealType} name="mealType-radios"
            onChange={(e) => dispatch(setMealType(e.target.value))}
            row
          >
            <FormControlLabel
              data-testid="mealTypeBarf"
              label="BARF"
              value="barf"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="4"
            />
            <FormControlLabel
              data-testid="mealTypePmr"
              label="PMR"
              value="pmr"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="5"
            />
            <FormControlLabel
              data-testid="mealTypeTradBarf"
              label="Traditional BARF"
              value="barf-traditional"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
              tabIndex="6"
            />
            <FormControlLabel
              data-testid="mealTypeTradPmr"
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
          data-testid="lifestagePresetAdult"
          size="small"
          color="secondary"
          variant={(lifestagePreset === adult) ? "contained" : "outlined"}
          onClick={() => dispatch(setLifestagePreset(adult))}
          tabIndex="8"
        >
          Adult
        </Button>
        <Button
          data-testid="lifestagePresetPuppy"
          size="small"
          color="secondary"
          variant={(lifestagePreset === puppy) ? "contained" : "outlined"}
          onClick={() => dispatch(setLifestagePreset(puppy))}
          tabIndex="9"
        >
          Puppy
        </Button>
      </div>
      <TextField
        className={classes.numericSmall}
        id="musclePercentage"
        data-testid="musclePercentage"
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
        data-testid="bonePercentage"
        label="Bone"
        value={bonePercentage}
        type="number"
        onChange={e => dispatch(updateBonePercentage(validateInteger(e.target.value)))}
        onFocus={(event) => event.target.select()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      {map(otherPercentages, (value, key) => {
        otherStartIndex++;
        return (
          <TextField
            tabIndex={otherStartIndex}
            className={classes.numericSmall}
            id={`${key}Percentage`}
            key={`${key}Percentage`}
            data-testid={`${key}Percentage`}
            label={key}
            value={value}
            type="number"
            onChange={e => dispatch(updateOtherPercentage(validateInteger(e.target.value), key))}
            onFocus={(event) => event.target.select()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              ),
            }}
          />
        );
      })}
    </Section>
  );
};

export default PercentageOptions;
