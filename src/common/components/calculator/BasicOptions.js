import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl, NativeSelect, InputLabel, FormLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';

import round from '../../calculations/round';
import unitOptions from '../../constants/unitOptions';

import { updateOptions } from '../../actions/calculator';
import Header2 from './Header2';
import Section from './Section';
import ValidatedTextField from '../form/ValidatedTextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  numericLarge: {
    margin: theme.spacing(1),
    width: 110,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const onNumericInput = (e, setIsInvalid, handleOnChange) => {
  const value = e.target.value;

  const isInvalid = isNaN(value);
  setIsInvalid(isInvalid);

  if (!isInvalid) {
    handleOnChange(value);
  }
};

const BasicOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.calculator);
  const { weight, unitDetails, maintenance, totalDailyAmount, estimatedCalories  } = settings;

  const [roundedDailyAmount, setRoundedDailyAmount] = useState(round(totalDailyAmount));

  useEffect(() => {
    // can limit how often the round function is called by
    // only invoking it when the totalDailyAmount is updated
    setRoundedDailyAmount(round(totalDailyAmount));
  }, [totalDailyAmount]);

  return (
    <Section>
      <Header2>Options</Header2>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="unit">Unit</InputLabel>
        <NativeSelect
          name="unit"
          id="unit"
          onChange={e => dispatch(updateOptions(Number(weight), maintenance, e.target.value))}
          value={unitDetails.name}
        >
          {unitOptions.map(option => (
            <option key={option.key} value={option.value}>{option.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <ValidatedTextField
        className={classes.numericLarge}
        id="weight"
        label="Dog Weight"
        value={weight}
        message="must be a number"
        handleOnChange={(val) => dispatch(updateOptions(val, maintenance, unitDetails.name))}
        onInput={onNumericInput}
        inputAdornment={unitDetails.lg}
      />
      <TextField
        className={classes.numericLarge}
        id="maintenance"
        label="Maintenance"
        value={maintenance}
        type="number"
        onChange={e => dispatch(updateOptions(weight, Number(e.target.value), unitDetails.name))}
        helperText="Start at 2.0-3.0%"
        inputProps={{
          min: 0,
          max: 100,
          step: 0.1,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericLarge}
        id="totalDailyAmount"
        label="Daily Amount"
        value={roundedDailyAmount}
        type="number"
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{unitDetails.sm}</InputAdornment>
          ),
        }}
      />
      <FormLabel component="legend" classes={{ root: classes.formLabel }}>Estimated Calories</FormLabel>
      <TextField
        className={classes.numericLarge}
        id="amountPer1000kCal"
        value={round(estimatedCalories, 0)}
        helperText="Used to calculate essential nutrients"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">kcal</InputAdornment>
          ),
        }}
      />
    </Section>
  );
};

export default BasicOptions;
