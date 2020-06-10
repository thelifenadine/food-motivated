import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { updateRMB } from '../../actions/calculator';
import rmbOptions from '../../form/rawMeatyBoneOptions';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  rmbOption: {
    margin: theme.spacing(1),
    width: 115,
  },
  rmbCustom: {
    margin: theme.spacing(1),
    width: 135,
  },
}));

const RawMeatyBone = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [customRMB, setCustomRMB] = useState(0);
  const [rmbOption, setRmbOption] = useState(rmbOptions[0].value);

  const onDropDownChange = (e) => {
    const optionValue = Number(e.target.value);  
    setCustomRMB(0);
    setRmbOption(optionValue);
  };

  /* eslint ignore react-hooks/exhaustive-deps */
  useEffect(() => {
    const rmbPercent = (rmbOption === 0) ? customRMB : rmbOption;

    dispatch(updateRMB(rmbPercent));
  }, [rmbOption, customRMB]);
  
  return (
    <Section>
      <Header2>Raw Meaty Bone</Header2>    
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="boneType">RMB Type</InputLabel>
        <NativeSelect
          name="boneType"
          id="boneType"
          onChange={onDropDownChange}
          defaultValue={rmbOptions[0].value}
        >
          {rmbOptions.map(option => (
            <option key={option.key} value={option.value}>{option.name}</option> 
          ))}
        </NativeSelect>
      </FormControl>
      {rmbOption !== 0 &&
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
      }
      {rmbOption === 0 &&
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
      }
    </Section>
  );
};

export default RawMeatyBone;
