import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FormControl, NativeSelect, InputLabel, FormLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';
import { Translate } from 'react-localize-redux';

import round from '../../calculations/round';
import unitOptions from '../../constants/unitOptions';
import { updateOptions } from '../../actions/calculator';
import validateFloat from '../../utils/validateFloat';

import Header2 from '../layout/Header2';
import Section from '../layout/Section';

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

const BasicOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    weight, unitDetails, maintenance, totalDailyAmount, estimatedCalories,
  } = useSelector(({ calculator }) => ({
    weight: calculator.weight,
    unitDetails: calculator.unitDetails,
    maintenance: calculator.maintenance,
    totalDailyAmount: calculator.totalDailyAmount,
    estimatedCalories: calculator.estimatedCalories,
  }), shallowEqual);

  const [roundedDailyAmount, setRoundedDailyAmount] = useState(round(totalDailyAmount));
  const [roundedCalories, setRoundedCalories] = useState(round(estimatedCalories));

  useEffect(() => {
    // can limit how often the round function is called by
    // only invoking it when the totalDailyAmount is updated
    setRoundedDailyAmount(round(totalDailyAmount));
    setRoundedCalories(round(roundedCalories));
  }, [totalDailyAmount, estimatedCalories]);

  return (
    <Translate>
      {({ translate }) => (
        <Section>
          <Header2>{translate('basicOptions.options')}</Header2>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="unit">{translate('basicOptions.unit')}</InputLabel>
            <NativeSelect
              tabIndex="1"
              name="unit"
              id="unit"
              data-testid="unit"
              onChange={e => dispatch(updateOptions(weight, maintenance, e.target.value))}
              value={unitDetails.name}
            >
              {unitOptions.map(option => (
                <option value={option.value} key={option.key}>
                  {translate(`basicOptions.${option.value}`)}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <TextField
            tabIndex="2"
            className={classes.numericLarge}
            id="weight"
            data-testid="weight"
            label={translate('basicOptions.dog-weight')}
            value={weight}
            type="number"
            onFocus={(event) => event.target.select()}
            onChange={(e) => dispatch(updateOptions(validateFloat(e.target.value), maintenance, unitDetails.name))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{unitDetails.lg}</InputAdornment>
              ),
            }}
          />
          <TextField
            tabIndex="3"
            className={classes.numericLarge}
            id="maintenance"
            data-testid="maintenance"
            label={translate('basicOptions.maintenance')}
            value={maintenance}
            type="number"
            onFocus={(event) => event.target.select()}
            onChange={e => dispatch(updateOptions(weight, validateFloat(e.target.value), unitDetails.name))}
            helperText={translate('basicOptions.start-at', { percentage: '2%-3%' })}
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
            data-testid="totalDailyAmount"
            label={translate('basicOptions.daily-amount')}
            value={roundedDailyAmount}
            type="number"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{unitDetails.sm}</InputAdornment>
              ),
            }}
          />
          <FormLabel component="legend" classes={{ root: classes.formLabel }}>
            {translate('basicOptions.estimated-calories')}
          </FormLabel>
          <TextField
            className={classes.numericLarge}
            id="estimatedCalories"
            data-testid="estimatedCalories"
            value={roundedCalories}
            disabled
            helperText={translate('basicOptions.used-to-calculate-essential-nutrients')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{translate('basicOptions.kcal')}</InputAdornment>
              ),
            }}
          />
        </Section>
      )}
    </Translate>
  );
};

export default BasicOptions;
