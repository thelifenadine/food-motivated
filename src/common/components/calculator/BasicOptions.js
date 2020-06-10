import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';

import round from '../../calculations/round';
import unitOptions from '../../form/unitOptions';

import { updateOptions } from '../../actions/calculator';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  numericLarge: {
    margin: theme.spacing(1),
    width: 110,
  },
}));

const BasicOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.calculator);
  const { totalDailyAmount, weight, unitDetails, maintenance } = settings;

  const [roundedDailyAmount, setRoundedDailyAmount] = useState(round(totalDailyAmount));

  useEffect(() => {
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
          onChange={e => dispatch(updateOptions(weight, maintenance, e.target.value))}
          defaultValue={'english'}
        >
          {unitOptions.map(option => (
            <option key={option.key} value={option.value}>{option.name}</option> 
          ))}
        </NativeSelect>
      </FormControl>           
      <TextField
        className={classes.numericLarge}
        id="weight" 
        label="Dog Weight"
        value={weight}
        type="number"
        onChange={e => dispatch(updateOptions(Number(e.target.value), maintenance))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{unitDetails.lg}</InputAdornment>
          ),
        }}
      />      
      <TextField
        className={classes.numericLarge}
        id="maintenance" 
        label="Maintenance"
        value={maintenance}
        type="number"
        onChange={e => dispatch(updateOptions(weight, Number(e.target.value)))}
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
    </Section>
  );
};

export default BasicOptions;
