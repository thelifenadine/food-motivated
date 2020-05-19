import round from '../../calculations/round';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, FormControl, NativeSelect, InputLabel, Paper, InputAdornment, Box, TextField
} from '@material-ui/core';

import Amounts from './Amounts';
import toPercent from '../../calculations/toPercent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
  },
  numericSmall: {
    width: 55,
    margin: theme.spacing(1),
  },
  numericMed: {
    width: 65,
    margin: theme.spacing(1),
  },
  numericLarge: {
    width: 100,
    margin: theme.spacing(1),
  },
  nativeSelect: {
    fontWeight: 'fontWeightLight',
  }
}));

const rmbOptions = [
  { name: 'Duck Head', value: 75, key: 'duck-head' },
  { name: 'Duck Neck', value: 50, key: 'duck-neck' },
  { name: 'Duck Wing', value: 39, key: 'duck-wing' },
  { name: 'Duck Foot', value: 60, key: 'duck-food' },
  { name: 'Chicken Wing', value: 46, key: 'chicken-wing' },
  { name: 'Chicken Foot', value: 60, key: 'chicken-foot' },
];

const unitOptions = [
  { name: 'English', value: 'english', key: 'english' },
  { name: 'Metric', value: 'metric', key: 'metric' },
];

const ageOptions = [
  { name: 'Adult', value: 'adult', key: 'adult' },
  { name: 'Puppy', value: 'puppy', key: 'puppy' },
];

const ageDefaults = {
  adult: {
    muscle: 70,
    bone: 10,
    liver: 5,
    organ: 5,
    veggie: 7,
    seed: 2,
    fruit: 1,
  },
  puppy: {
    muscle: 58,
    bone: 17,
    liver: 7,
    organ: 7,
    veggie: 7,
    seed: 2,
    fruit: 1,
  },
};

const unitData = {
  english: {
    dog: 'lb',
    food: 'oz',
    perUnit: 16,
  },
  metric: {
    dog: 'kg',
    food: 'g',
    perUnit: 1000,
  }
};

// set metric here and pass to other components
const getTotalAmount = (weight, maintenancePercentage, unitAmount = 16) => {
  const weightByUnit = weight * unitAmount;
  const totalAmountInOunces = weightByUnit * toPercent(maintenancePercentage);
  return round(totalAmountInOunces);
};

const DogCalculator = () => {
  const classes = useStyles();

  // settings
  const [weight, setWeight] = useState(68);
  const [maintenance, setMaintenance] = useState(3);
  const [age, setAge] = useState('adult');

  const [muscleRatio, setMuscleRatio] = useState(ageDefaults[age].muscle);
  const [boneRatio, setBoneRatio] = useState(ageDefaults[age].bone);
  const [liverRatio, setLiverRatio] = useState(ageDefaults[age].liver);
  const [organRatio, setOrganRatio] = useState(ageDefaults[age].organ);
  const [veggieRatio, setVeggieRatio] = useState(ageDefaults[age].veggie);
  const [seedRatio, setSeedRatio] = useState(ageDefaults[age].seed);
  const [fruitRatio, setFruitRatio] = useState(ageDefaults[age].fruit);

  const [boneType, setBoneType] = useState(75);
  const [unit, setUnit] = useState('english');
  const [unitDetails, setUnitDetails] = useState(unitData[unit]);
  const [amount, setAmount] = useState(getTotalAmount(weight, maintenance, unitDetails.perUnit));

  useEffect(() => {
    setAmount(getTotalAmount(weight, maintenance, unitDetails.perUnit));
  }, [weight, maintenance, unitDetails]);

  useEffect(() => {
    setUnitDetails(unitData[unit]);
  }, [unit]);

  useEffect(() => {
    setBoneRatio(ageDefaults[age].bone);
    setLiverRatio(ageDefaults[age].liver);
    setOrganRatio(ageDefaults[age].organ);
    setVeggieRatio(ageDefaults[age].veggie);
    setSeedRatio(ageDefaults[age].seed);
    setFruitRatio(ageDefaults[age].fruit);
  }, [age]);

  useEffect(() => {
    const newMuscleRatio = 100 - (boneRatio + liverRatio + organRatio + veggieRatio + seedRatio + fruitRatio);
    setMuscleRatio(newMuscleRatio);
  }, [boneRatio, liverRatio, organRatio, veggieRatio, seedRatio, fruitRatio]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} square>       
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Options</Box>     
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="unit">Unit</InputLabel>
              <NativeSelect
                className={classes.nativeSelect}
                name="unit"
                id="unit"
                onChange={e => setUnit(e.target.value)}
                defaultValue={'english'}
              >
                {unitOptions.map(option => (
                  <option key={option.key} value={option.value}>{option.name}</option> 
                ))}
              </NativeSelect>
            </FormControl>    
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="unit">Age</InputLabel>
              <NativeSelect
                className={classes.nativeSelect}
                name="age"
                id="age"
                onChange={e => setAge(e.target.value)}
                defaultValue={'adult'}
              >
                {ageOptions.map(option => (
                  <option key={option.key} value={option.value}>{option.name}</option> 
                ))}
              </NativeSelect>
            </FormControl>    
          </Paper>
          <Paper elevation={0} square>       
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Dog Info</Box>     
            <TextField
              className={classes.numericLarge}
              id="weight" 
              label="Weight"
              value={weight}
              type="number"
              onChange={e => setWeight(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{unitDetails.dog}</InputAdornment>
                ),
              }}
            />      
            <TextField
              className={classes.numericLarge}
              id="maintenance" 
              label="Maintenance"
              value={maintenance}
              type="number"
              onChange={e => setMaintenance(Number(e.target.value))}
              helperText="2.0-3.0%"
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
              id="amount" 
              label="Daily Amount"
              value={amount}
              type="number"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{unitDetails.food}</InputAdornment>
                ),
              }}
            />  
          </Paper>
          <Paper elevation={0} square>     
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Type of Raw Meaty Bone</Box>    
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="bone">RMB Type</InputLabel>
              <NativeSelect
                className={classes.nativeSelect}
                name="boneType"
                id="bone"
                onChange={e => setBoneType(Number(e.target.value))}
                defaultValue={75}
              >
                {rmbOptions.map(option => (
                  <option key={option.key} value={option.value}>{option.name}</option> 
                ))}
              </NativeSelect>
            </FormControl>
            <TextField
              className={classes.numericLarge}
              id="boneRatio" 
              label="RMB Ratio"
              value={boneType}
              type="number"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
          </Paper>
          <Paper elevation={0} square> 
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Desired Ratios </Box>
            <TextField
              className={classes.numericSmall}
              id="muscleRatio" 
              label="Muscle"
              value={muscleRatio}
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
              id="boneRatio" 
              label="Bone"
              value={boneRatio}
              type="number"
              onChange={e => setBoneRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.numericSmall}
              id="liverRatio" 
              label="Liver"
              value={liverRatio}
              type="number"
              onChange={e => setLiverRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.numericSmall}
              id="organRatio" 
              label="Organ"
              value={organRatio}
              type="number"
              onChange={e => setOrganRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.numericSmall}
              id="veggieRatio" 
              label="Vegetables"
              value={veggieRatio}
              type="number"
              onChange={e => setVeggieRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.numericSmall}
              id="seedRatio" 
              label="Nuts/Seeds"
              value={seedRatio}
              type="number"
              onChange={e => setSeedRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.numericSmall}
              id="fruitRatio" 
              label="Fruit"
              value={fruitRatio}
              type="number"
              onChange={e => setFruitRatio(Number(e.target.value))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Amounts 
            amount={amount}
            boneType={boneType}
            boneRatio={boneRatio}
            organRatio={organRatio}
            liverRatio={liverRatio}
            veggieRatio={veggieRatio}
            seedRatio={seedRatio}
            fruitRatio={fruitRatio}
            unitDetails={unitDetails}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DogCalculator;

// could do this if you're not using a lot of effects
// const [inputs, setInput] = useState({
//   muscleRatio: 70,
//   boneRatio: 10,
// });
// const handleNumericInputChange = (event) => {
//   setInput({ ...inputs, [event.target.name]: Number(event.target.value) });
// };