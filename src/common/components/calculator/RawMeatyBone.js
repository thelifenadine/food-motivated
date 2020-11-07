import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { updateRMB, updateCustomRMB } from '../../actions/calculator';
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
  const settings = useSelector(state => state.calculator);

  const { rmbPercent, rmbKey, isCustomRmb } = settings;

  const onDropDownChange = (e) => {
    const dropdownValue = e.target.value;
    dispatch(updateRMB(dropdownValue, dropdownValue === 'custom'));
  };

  return (
    <Section>
      <Header2>Raw Meaty Bone</Header2>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="boneType">RMB Type</InputLabel>
        <NativeSelect
          name="boneType"
          id="boneType"
          onChange={onDropDownChange}
          value={rmbKey}
        >
          {rmbOptions.map(option => (
            <option key={option.key} value={option.key}>{option.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
      {!isCustomRmb &&
        <TextField
          className={classes.rmbOption}
          id="rmbOption"
          label="Bone Content"
          value={rmbPercent}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            ),
          }}
        />
      }
      {isCustomRmb &&
        <TextField
          // error={true}
          // helperText="must be a number"
          className={classes.rmbCustom}
          id="customRMB"
          label="Enter RMB %"
          value={rmbPercent}
          onChange={e => dispatch(updateCustomRMB(e.target.value))}
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
