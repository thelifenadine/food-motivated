import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { updateRMB, updateCustomRMB } from '../../actions/calculator';
import rmbOptions from '../../constants/rawMeatyBoneOptions';
import Header2 from './Header2';
import Section from './Section';
import ValidatedTextField from '../form/ValidatedTextField';

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

const onPercentInput = (e, setIsInvalid, handleOnChange) => {
  // + to cast to a number
  const value = +e.target.value;

  const isInvalid = isNaN(value);
  setIsInvalid(isInvalid);

  if (!isInvalid && value <= 100) {
    handleOnChange(value);
  }
};

const RawMeatyBone = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rmbPercent, rmbKey, isCustomRmb } = useSelector(state => state.calculator);

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
        <ValidatedTextField
          value={rmbPercent}
          className={classes.rmbCustom}
          message="must be a number"
          id="customRMB"
          label="Enter RMB %"
          handleOnChange={(val) => dispatch(updateCustomRMB(val))}
          onInput={onPercentInput}
          inputAdornment="%"
        />
      }
    </Section>
  );
};

export default RawMeatyBone;
