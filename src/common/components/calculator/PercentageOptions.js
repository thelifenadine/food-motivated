import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, Box, TextField, Button, makeStyles } from '@material-ui/core';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import ratioDefaultOptions, { ratioDefaultData } from '../../form/ratioDefaultOptions';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  numericSmall: {
    margin: theme.spacing(2),
    width: 55,
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(0.5),
      fontSize: 11,
    },
  },
  inlineButtonText: {
    margin: theme.spacing(2),
    fontWeight: 300,
    fontSize: 15,
  },
}));

const PercentageOptions = ({
  percentages,
  setPercentages,
}) => {
  const classes = useStyles();
  const { muscle, bone, organ, liver, veggie, fruit, seed } = percentages;

  const onFormPercentageChange = (e, updatedProperty) => {
    setPercentages({
      ...percentages,
      [updatedProperty]: Number(e.target.value),
    });
  };

  /* eslint ignore react-hooks/exhaustive-deps */
  useEffect(() => {
    const musclePercentage = getMuscleAmount(100, [bone, liver, organ, veggie, fruit, seed]);

    setPercentages({
      ...percentages,
      muscle: musclePercentage,
    });
  }, [bone, organ, liver, veggie, fruit, seed]);

  return (
    <Section>
      <Header2>Desired Percentages</Header2>
      <Box component="div" className={classes.buttonWrapper}>
        <Box component="span" className={classes.inlineButtonText}>Reset defaults for: </Box>
        {ratioDefaultOptions.map(option => (
          <Button 
            size="small"
            variant="outlined"
            color="secondary"
            key={option.key} 
            onClick={() => setPercentages(ratioDefaultData[option.value])}
          >
            {option.name}
          </Button>
        ))}
      </Box>
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

PercentageOptions.propTypes = {
  percentages: PropTypes.object.isRequired,
  setPercentages: PropTypes.func.isRequired,
};

export default PercentageOptions;
