import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { updateRMB, updateCustomRMB } from '../../actions/calculator';
import rmbOptions from '../../constants/rawMeatyBoneOptions';
import validateInteger from '../../utils/validateFloat';

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

const RawMeatyBone = ({
  actions,
  rmbPercent,
  rmbKey,
  isCustomRmb,
}) => {
  const classes = useStyles();

  const onDropDownChange = (e) => {
    const dropdownValue = e.target.value;
    actions.updateRMB(dropdownValue, dropdownValue === 'custom');
  };

  return (
    <Section>
      <Header2>Raw Meaty Bone</Header2>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="boneType">RMB Type</InputLabel>
        <NativeSelect
          tabIndex="20"
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
          value={rmbPercent}
          className={classes.rmbCustom}
          helperText="must be a number"
          id="customRMB"
          label="Enter RMB %"
          type="number"
          onFocus={(event) => event.target.select()}
          onChange={(e) => actions.updateCustomRMB(validateInteger(e.target.value))}
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

RawMeatyBone.propTypes = {
  actions: PropTypes.object.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  rmbKey: PropTypes.string.isRequired,
  isCustomRmb: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateRMB,
      updateCustomRMB,
    }, dispatch),
  };
}

export function mapStateToProps({ calculator = {} }) {
  return {
    rmbPercent: calculator.rmbPercent,
    rmbKey: calculator.rmbKey,
    isCustomRmb: calculator.isCustomRmb,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RawMeatyBone);
