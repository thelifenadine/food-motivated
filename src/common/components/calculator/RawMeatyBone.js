import React from 'react';
import PropTypes from 'prop-types';
import { 
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField,
} from '@material-ui/core';

import useStyles from '../../styles/useStyles';
import Header2 from './Header2';
import Section from './Section';

const RawMeatyBone = (props) => {
  const { 
    rmbOption,
    setRmbOption,
    customRMB,
    setCustomRMB,
    rmbOptions,
  } = props;

  const classes = useStyles({ rmbOption });

  const onOptionChange = (e) => {
    const optionValue = Number(e.target.value);  
    setCustomRMB(0);
    setRmbOption(optionValue);
  };

  return (
    <Section>
      <Header2>Raw Meaty Bone</Header2>    
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="bone">RMB Type</InputLabel>
        <NativeSelect
          name="rmbOption"
          id="bone"
          onChange={onOptionChange}
          defaultValue={rmbOptions[0].value}
        >
          {rmbOptions.map(option => (
            <option key={option.key} value={option.value}>{option.name}</option> 
          ))}
        </NativeSelect>
      </FormControl>
      <TextField
        className={classes.rmbOption}
        id="rmbOption" 
        label="Bone Content"
        value={rmbOption}
        type="number"
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.rmbCustom}
        id="customRMB" 
        label="Enter RMB %"
        value={customRMB}
        type="number"
        onChange={e => setCustomRMB(Number(e.target.value))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
    </Section>
  );
};

RawMeatyBone.propTypes = {
  rmbOption: PropTypes.number.isRequired,
  setRmbOption: PropTypes.func.isRequired,
  customRMB: PropTypes.number.isRequired,
  setCustomRMB: PropTypes.func.isRequired,
  rmbOptions: PropTypes.array.isRequired,
};

export default RawMeatyBone;
