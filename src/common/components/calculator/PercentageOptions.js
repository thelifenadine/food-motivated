import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, Box, TextField, Button } from '@material-ui/core';
import ratioDefaultOptions from '../../form/ratioDefaultOptions';
import useStyles from '../../styles/useStyles';
import Header2 from './Header2';
import Section from './Section';

const PercentageOptions = ({
  setAge,
  musclePercentage,
  bonePercentage,
  setBonePercentage,
  liverPercentage,
  setLiverPercentage,
  organPercentage,
  setOrganPercentage,
  veggiePercentage,
  setVeggiePercentage,
  seedPercentage,
  setSeedPercentage,
  fruitPercentage, 
  setFruitPercentage,
}) => {
  const classes = useStyles();

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
            onClick={() => setAge(option.value)}
          >
            {option.name}
          </Button>
        ))}
      </Box>
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
        onChange={e => setBonePercentage(Number(e.target.value))}
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
        value={liverPercentage}
        type="number"
        onChange={e => setLiverPercentage(Number(e.target.value))}
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
        value={organPercentage}
        type="number"
        onChange={e => setOrganPercentage(Number(e.target.value))}
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
        value={veggiePercentage}
        type="number"
        onChange={e => setVeggiePercentage(Number(e.target.value))}
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
        value={seedPercentage}
        type="number"
        onChange={e => setSeedPercentage(Number(e.target.value))}
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
        value={fruitPercentage}
        type="number"
        onChange={e => setFruitPercentage(Number(e.target.value))}
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
  setAge: PropTypes.func.isRequired,
  musclePercentage: PropTypes.number.isRequired,
  bonePercentage: PropTypes.number.isRequired,
  setBonePercentage: PropTypes.func.isRequired,
  liverPercentage: PropTypes.number.isRequired,
  setLiverPercentage: PropTypes.func.isRequired,
  organPercentage: PropTypes.number.isRequired,
  setOrganPercentage: PropTypes.func.isRequired,
  veggiePercentage: PropTypes.number.isRequired,
  setVeggiePercentage: PropTypes.func.isRequired,
  seedPercentage: PropTypes.number.isRequired,
  setSeedPercentage: PropTypes.func.isRequired,
  fruitPercentage: PropTypes.number.isRequired,
  setFruitPercentage: PropTypes.func.isRequired,
};

export default PercentageOptions;
