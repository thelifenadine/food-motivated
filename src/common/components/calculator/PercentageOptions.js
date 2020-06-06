import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, TextField, Button, makeStyles } from '@material-ui/core';
import ratioDefaultOptions from '../../form/ratioDefaultOptions';
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
  const { percentages } = useSelector(state => state.calculator);
  const { muscle, bone, organ, liver, veggie, fruit, seed } = percentages;

  const onFormPercentageChange = (e, updatedProperty) => {
    dispatch({
      type: 'UPDATE_PERCENTAGES', 
      updatedProperty,
      updatedValue: Number(e.target.value),
    });
  };

  return (
    <Section>
      <Header2>Desired Percentages</Header2>
      <div className={classes.buttonWrapper}>
        <span className={classes.inlineButtonText}>Reset defaults for: </span>
        {ratioDefaultOptions.map(option => (
          <Button 
            size="small"
            variant="outlined"
            color="secondary"
            key={option.key} 
            onClick={() => dispatch({
              type: 'RESET_PERCENTAGE_DEFAULTS',
              defaultsKey: option.value,
            })}
          >
            {option.name}
          </Button>
        ))}
      </div>
      <TextField
        className={classes.numericSmall}
        id="musclePercentage" 
        label="Muscle"
        value={muscle}
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
        value={bone}
        type="number"
        onChange={e => onFormPercentageChange(e, 'bone')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="liverPercentage" 
        label="Liver"
        value={liver}
        type="number"
        onChange={e => onFormPercentageChange(e, 'liver')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="organPercentage" 
        label="Organ"
        value={organ}
        type="number"
        onChange={e => onFormPercentageChange(e, 'organ')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="veggiePercentage" 
        label="Vegetables"
        value={veggie}
        type="number"
        onChange={e => onFormPercentageChange(e, 'veggie')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="seedPercentage" 
        label="Nuts/Seeds"
        value={seed}
        type="number"
        onChange={e => onFormPercentageChange(e, 'seed')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.numericSmall}
        id="fruitPercentage" 
        label="Fruit"
        value={fruit}
        type="number"
        onChange={e => onFormPercentageChange(e, 'fruit')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">%</InputAdornment>
          ),
        }}
      />
    </Section>
  );
};

export default PercentageOptions;
