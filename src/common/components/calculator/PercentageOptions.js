import map from 'lodash/map';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, TextField, Button, makeStyles } from '@material-ui/core';

import percentageDefaultOptions from '../../form/percentageDefaultOptions';
import { updateBonePercentage, updateOtherPercentage, resetDefaultPercentages } from '../../actions/calculator';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  numericSmall: {
    margin: theme.spacing(1),
    width: 55,
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(0.5),
      fontSize: 11,
    },
  },
  inlineButtonText: {
    margin: theme.spacing(1),
    fontWeight: 300,
    fontSize: 15,
  },
}));

const PercentageOptions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { otherPercentages, musclePercentage, bonePercentage } = useSelector(state => state.calculator);
  return (
    <Section>
      <Header2>Desired Percentages</Header2>
      <div className={classes.buttonWrapper}>
        <span className={classes.inlineButtonText}>Reset defaults for: </span>
        {percentageDefaultOptions.map(option => (
          <Button 
            size="small"
            variant="outlined"
            color="secondary"
            key={option.key} 
            onClick={() => dispatch(resetDefaultPercentages(option.value))}
          >
            {option.name}
          </Button>
        ))}
      </div>
      <TextField
        className={classes.numericSmall}
        id="musclePercentage" 
        label="Muscle"
        value={musclePercentage}
        type="number"
        disabled
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="bonePercentage" 
        label="Bone"
        value={bonePercentage}
        type="number"
        onChange={e => dispatch(updateBonePercentage(Number(e.target.value)))}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      {map(otherPercentages, (value, key) => (
        <TextField
          className={classes.numericSmall}
          id={`${key}Percentage`} 
          key={`${key}Percentage`} 
          label={key}
          value={value}
          type="number"
          onChange={e => dispatch(updateOtherPercentage(Number(e.target.value), key))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            ),
          }}
        />        
      ))}
    </Section>
  );
};

export default PercentageOptions;
