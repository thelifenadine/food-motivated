import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';

import Header2 from './Header2';
import Section from './Section';

import round from '../../calculations/round';
import getTotalAmount from '../../calculations/getTotalAmount';
import unitOptions from '../../form/unitOptions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
  numericLarge: {
    margin: theme.spacing(2),
    width: 110,
  },
}));

const BasicOptions = ({
  setUnit,
  setDailyAmount,
  totalDailyAmount,
  unitDetails,
}) => {
  const classes = useStyles();
  const [weight, setWeight] = useState(68);
  const [maintenance, setMaintenance] = useState(2.5);
  const [roundedDailyAmount, setRoundedDailyAmount] = useState(round(totalDailyAmount));

  useEffect(() => {
    setDailyAmount(getTotalAmount(weight, maintenance, unitDetails.perUnit));
  }, [setDailyAmount, weight, maintenance, unitDetails]);

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
          onChange={e => setUnit(e.target.value)}
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
        onChange={e => setWeight(Number(e.target.value))}
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
        onChange={e => setMaintenance(Number(e.target.value))}
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

BasicOptions.propTypes = {
  setUnit: PropTypes.func.isRequired,
  totalDailyAmount: PropTypes.number.isRequired,
  setDailyAmount: PropTypes.func.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default BasicOptions;
