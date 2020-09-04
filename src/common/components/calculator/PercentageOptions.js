import map from 'lodash/map';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button,
  InputAdornment, TextField, makeStyles
} from '@material-ui/core';
import {
  updateBonePercentage,
  updateOtherPercentage,
  setAge,
  setMealType,
} from '../../actions/calculator';
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

const PercentageOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    otherPercentages, musclePercentage, bonePercentage, isAdult, isPuppy, mealType,
  } = useSelector(state => state.calculator);

  return (
    <Section>
      <Header2>Percentages</Header2>
      <div className={classes.radioWrapper}>
        <FormControl component="fieldset" margin="none" variant="outlined">
          <FormLabel component="legend" classes={{ root: classes.formLabel }}>Meal Type</FormLabel>
          <RadioGroup
            value={mealType} aria-label={mealType} name="mealType-radios"
            onChange={(e) => dispatch(setMealType(e.target.value))}
            row
          >
            <FormControlLabel
              label="BARF"
              value="barf"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
            />
            <FormControlLabel
              label="PMR"
              value="pmr"
              control={<Radio size="small" classes={{ root: classes.radio }} />}
              classes={{ label: classes.radioLabel }}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.buttonWrapper}>
        <span>Lifestage Preset:</span>
        <Button
          size="small"
          color="secondary"
          variant={isAdult ? "contained" : "outlined"}
          onClick={() => dispatch(setAge({ isPuppy: false, isAdult: true }))}
        >
          Adult
        </Button>
        <Button
          size="small"
          color="secondary"
          variant={isPuppy ? "contained" : "outlined"}
          onClick={() => dispatch(setAge({ isPuppy: true, isAdult: false }))}
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
        className={classes.numericSmall}
        id="bonePercentage"
        label="Bone"
        value={bonePercentage}
        type="number"
        onChange={e => dispatch(updateBonePercentage(Number(e.target.value)))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      {map(otherPercentages, (value, key) => (
        <TextField
          className={classes.numericSmall}
          id={`${key}Percentage`}
          key={`${key}Percentage`}
          label={key}
          value={value}
          type="number"
          onChange={e => dispatch(updateOtherPercentage(Number(e.target.value), key))}
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

export default PercentageOptions;
