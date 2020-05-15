import round from 'lodash/round';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

const roundOne = (amount) => {
  return round(amount, 1);
};

const getPercentage = (percentage) => {
  return percentage / 100;
};

const getAmountPercentage = (percentage, amount) => {
  return amount * getPercentage(percentage);
};

const getRoundedAmount = (amount, percentage) => {
  const calculated = getAmountPercentage(amount, percentage);
  return roundOne(calculated);
};

const getBoneAmount = (amount, boneRatio, boneType) => {
  const newBoneAmount = (getAmountPercentage(amount, boneRatio)) / getPercentage(boneType);
  return roundOne(newBoneAmount);
};

const getMuscleAmount = (amount, boneAmount, organAmount, liverAmount, totalVegAmount) => {
  const newMuscleAmount = amount - boneAmount - organAmount - liverAmount - totalVegAmount;
  return roundOne(newMuscleAmount);
};

const metric = 'oz';
const vegPerc = 0.7;
const seedPerc = 0.2;
const fruitPerc = 0.1;

const Amounts = (props) => {
  const { 
    amount,
    boneType,
    boneRatio, 
    organRatio, 
    liverRatio, 
    veggieRatio,
  } = props;

  // const classes = useStyles();
  const [boneAmount, setBoneAmount] = useState(getBoneAmount(amount, boneRatio, boneType));
  const [liverAmount, setLiverAmount] = useState(getRoundedAmount(amount, liverRatio));
  const [organAmount, setOrganAmount] = useState(getRoundedAmount(amount, organRatio));

  const [totalVegAmount, setTotalVegAmount] = useState(getRoundedAmount(amount, veggieRatio));
  const [vegAmount, setVegAmount] = useState(roundOne(totalVegAmount * vegPerc));
  const [seedAmount, setSeedAmount] = useState(roundOne(totalVegAmount * seedPerc));
  const [fruitAmount, setFruitAmount] = useState(roundOne(totalVegAmount * fruitPerc));
  const [muscleAmount, setMuscleAmount] = useState(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));

  useEffect(() => {
    setBoneAmount(getBoneAmount(amount, boneRatio, boneType));
  }, [amount, boneRatio, boneType]);

  useEffect(() => {
    const updatedVegAmount = getRoundedAmount(amount, veggieRatio);
    setTotalVegAmount(updatedVegAmount);
    setVegAmount(roundOne(updatedVegAmount * vegPerc));
    setSeedAmount(roundOne(updatedVegAmount * seedPerc));
    setFruitAmount(roundOne(updatedVegAmount * fruitPerc));
  }, [amount, veggieRatio]);

  useEffect(() => {
    setOrganAmount(getRoundedAmount(amount, organRatio));
  }, [amount, organRatio]);

  useEffect(() => {
    setLiverAmount(getRoundedAmount(amount, liverRatio));
  }, [amount, liverRatio]);

  useEffect(() => {
    setMuscleAmount(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));
  }, [amount, boneAmount, organAmount, liverAmount, totalVegAmount]);

  return (
    <Grid item xs={12} sm={6}> 
      <Box component="h3">What to feed</Box>
      <table>
        <tbody>
          <tr>
            <td>Boneless Meat</td>
            <td>{`${muscleAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Raw Meaty Bone</td>
            <td>{`${boneAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Liver</td>
            <td>{`${liverAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Organ</td>
            <td>{`${organAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Vegetables</td>
            <td>{`${vegAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Nuts/Seeds</td>
            <td>{`${seedAmount} ${metric}`}</td>
          </tr>
          <tr>
            <td>Fruit</td>
            <td>{`${fruitAmount} ${metric}`}</td>
          </tr>
        </tbody>
      </table>
    </Grid>
  );
};

Amounts.propTypes = {
  amount: PropTypes.number.isRequired,
  boneType: PropTypes.number.isRequired,
  boneRatio: PropTypes.number.isRequired,
  liverRatio: PropTypes.number.isRequired,
  organRatio: PropTypes.number.isRequired,
  veggieRatio: PropTypes.number.isRequired,
};

export default Amounts;

// if you weren't to use state
// const boneAmount = round(((amount * getPercentage(boneRatio)) / getPercentage(boneType)), 1);
// const liverAmount = round(amount * getPercentage(liverRatio), 1);
// const organAmount = round(amount * getPercentage(organRatio), 1);

// const totalVeggieAmount = round(amount * getPercentage(veggieRatio), 1);
// const vegAmount = round(totalVeggieAmount * .7, 1);
// const seedAmount = round(totalVeggieAmount * .2, 1);
// const fruitAmount = round(totalVeggieAmount * .1, 1);

// const newMuscleAmount = amount - boneAmount - organAmount - liverAmount - vegAmount;
// const muscleAmount = round(newMuscleAmount, 1);

{/* <FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-muscle-amount">Boneless Meat</InputLabel>
<Input name="muscleAmount" id="calc-muscle-amount" value={muscleAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-bone-amount">Raw Meaty Bone</InputLabel>
<Input name="boneAmount" id="calc-bone-amount" value={boneAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-liver-amount">Liver</InputLabel>
<Input name="liverAmount" id="calc-liver-amount" value={liverAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-organ-amount">Organ</InputLabel>
<Input name="organAmount" id="calc-organ-amount" value={organAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-veg-amount">Vegetables</InputLabel>
<Input name="vegAmount" id="calc-veg-amount" value={vegAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-seed-amount">Nuts/Seeds</InputLabel>
<Input name="seedAmount" id="calc-seed-amount" value={seedAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl>
<FormControl className={classes.formControl}>
<InputLabel htmlFor="calc-fruit-amount">Fruit</InputLabel>
<Input name="fruitAmount" id="calc-fruit-amount" value={fruitAmount}
  disabled
  endAdornment={<InputAdornment position="end">{metric}</InputAdornment>}
/>
</FormControl> */}