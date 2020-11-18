import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormControl, NativeSelect, InputLabel, FormLabel, InputAdornment, TextField, makeStyles,
} from '@material-ui/core';

import round from '../../calculations/round';
import unitOptions from '../../constants/unitOptions';
import { updateOptions } from '../../actions/calculator';
import validateFloat from '../../utils/validateFloat';

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
  formLabel: {
    fontSize: 14,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const BasicOptions = ({
  actions,
  weight,
  unitDetails,
  maintenance,
  totalDailyAmount,
  estimatedCalories,
}) => {
  const classes = useStyles();
  const [roundedDailyAmount, setRoundedDailyAmount] = useState(round(totalDailyAmount));

  useEffect(() => {
    // can limit how often the round function is called by
    // only invoking it when the totalDailyAmount is updated
    setRoundedDailyAmount(round(totalDailyAmount));
  }, [totalDailyAmount]);

  return (
    <Section>
      <Header2>Options</Header2>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="unit">Unit</InputLabel>
        <NativeSelect
          tabIndex="1"
          name="unit"
          id="unit"
          onChange={e => actions.updateOptions(weight, maintenance, validateFloat(e.target.value))}
          value={unitDetails.name}
        >
          {unitOptions.map(option => (
            <option key={option.key} value={option.value}>{option.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <TextField
        tabIndex="2"
        className={classes.numericLarge}
        id="weight"
        label="Dog Weight"
        value={weight}
        type="number"
        onFocus={(event) => event.target.select()}
        onChange={(e) => actions.updateOptions(validateFloat(e.target.value), maintenance, unitDetails.name)}
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
        label="Maintenance"
        value={maintenance}
        type="number"
        onFocus={(event) => event.target.select()}
        onChange={e => actions.updateOptions(weight, validateFloat(e.target.value), unitDetails.name)}
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
      <FormLabel component="legend" classes={{ root: classes.formLabel }}>
        Estimated Calories
      </FormLabel>
      <TextField
        className={classes.numericLarge}
        id="amountPer1000kCal"
        value={round(estimatedCalories, 0)}
        disabled
        helperText="Used to calculate essential nutrients"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">kcal</InputAdornment>
          ),
        }}
      />
    </Section>
  );
};

BasicOptions.propTypes = {
  actions: PropTypes.object.isRequired,
  weight: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
  maintenance: PropTypes.number.isRequired,
  totalDailyAmount: PropTypes.number.isRequired,
  estimatedCalories: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateOptions,
    }, dispatch),
  };
}

export function mapStateToProps({ calculator = {} }) {
  return {
    weight: calculator.weight,
    unitDetails: calculator.unitDetails,
    maintenance: calculator.maintenance,
    totalDailyAmount: calculator.totalDailyAmount,
    estimatedCalories: calculator.estimatedCalories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicOptions);
