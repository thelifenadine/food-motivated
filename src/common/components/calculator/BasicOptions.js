import React from 'react';
import PropTypes from 'prop-types';
import { 
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import unitOptions from '../../form/unitOptions';
import useStyles from '../../styles/useStyles';
import Header2 from './Header2';
import Section from './Section';

const BasicOptions = ({
  setUnit,
  weight,
  setWeight,
  maintenance,
  setMaintenance,
  amount,
  unitDetails,
}) => {
  const classes = useStyles();

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
        id="amount" 
        label="Daily Amount"
        value={amount}
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
  weight: PropTypes.number.isRequired,
  setWeight: PropTypes.func.isRequired,
  maintenance: PropTypes.number.isRequired,
  setMaintenance: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default BasicOptions;
