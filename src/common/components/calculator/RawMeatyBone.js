import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FormControl, NativeSelect, InputLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { updateRMB, updateCustomRMB } from '../../actions/calculator';
import rmbOptions from '../../constants/rawMeatyBoneOptions';
import validateInteger from '../../utils/validateInteger';
import { Translate } from 'react-localize-redux';

import Header2 from '../layout/Header2';
import Section from '../layout/Section';

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

  const {
    rmbPercent, rmbKey, isCustomRmb,
  } = useSelector(({ calculator }) => ({
    rmbPercent: calculator.rmbPercent,
    rmbKey: calculator.rmbKey,
    isCustomRmb: calculator.isCustomRmb,
  }), shallowEqual);

  const onDropDownChange = (e) => {
    const dropdownValue = e.target.value;
    dispatch(updateRMB(dropdownValue, dropdownValue === 'custom'));
  };

  return (
    <Translate>
      {({ translate }) => (
        <Section>
          <Header2>{translate('rmb.raw-meaty-bone')}</Header2>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="boneType">{translate('rmb.rmb-type')}</InputLabel>
            <NativeSelect
              tabIndex="20"
              name="boneType"
              data-testid="boneType"
              id="boneType"
              onChange={onDropDownChange}
              value={rmbKey}
            >
              {rmbOptions.map(option => (
                <option key={option.key} value={option.key}>{translate(`rmb.${option.key}`)}</option>
              ))}
            </NativeSelect>
          </FormControl>
          {!isCustomRmb &&
            <TextField
              className={classes.rmbOption}
              data-testid="rmbOption"
              id="rmbOption"
              label={translate('rmb.bone-content')}
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
              helperText={translate('rmb.must-be-a-number')}
              id="customRMB"
              data-testid="customRMB"
              label={translate('rmb.enter-rmb-percent')}
              type="number"
              onFocus={(event) => event.target.select()}
              onChange={(e) => dispatch(updateCustomRMB(validateInteger(e.target.value)))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
          }
        </Section>
      )}
    </Translate>
  );
};

export default RawMeatyBone;
