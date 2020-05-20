import round from '../../calculations/round';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, FormControl, NativeSelect, InputLabel, Paper, InputAdornment, Box, TextField, Button
} from '@material-ui/core';

import Amounts from './Amounts';
import toPercent from '../../calculations/toPercent';
import rmbOptions from '../../form/rawMeatyBoneOptions';
import ageOptions from '../../form/ageOptions';
import unitOptions from '../../form/unitOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
  },
  formControlWide: {
    margin: theme.spacing(1),
    minWidth: 150,
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
    width: 110,
    margin: theme.spacing(1),
  },
  nativeSelect: {
    fontWeight: 'fontWeightLight',
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  visible: {
    display: 'block',
  }, 
  hidden: {
    display: 'none',
  }
}));

const defaultRatios = {
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
  const [maintenance, setMaintenance] = useState(2.5);
  const [age, setAge] = useState('adult');

  const [muscleRatio, setMuscleRatio] = useState(defaultRatios[age].muscle);
  const [boneRatio, setBoneRatio] = useState(defaultRatios[age].bone);
  const [liverRatio, setLiverRatio] = useState(defaultRatios[age].liver);
  const [organRatio, setOrganRatio] = useState(defaultRatios[age].organ);
  const [veggieRatio, setVeggieRatio] = useState(defaultRatios[age].veggie);
  const [seedRatio, setSeedRatio] = useState(defaultRatios[age].seed);
  const [fruitRatio, setFruitRatio] = useState(defaultRatios[age].fruit);

  const [customRMB, setCustomRMB] = useState(0);
  const [boneType, setBoneType] = useState(rmbOptions[0].value);
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
    setBoneRatio(defaultRatios[age].bone);
    setLiverRatio(defaultRatios[age].liver);
    setOrganRatio(defaultRatios[age].organ);
    setVeggieRatio(defaultRatios[age].veggie);
    setSeedRatio(defaultRatios[age].seed);
    setFruitRatio(defaultRatios[age].fruit);
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
            <TextField
              className={classes.numericLarge}
              id="weight" 
              label="Dog Weight"
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
              helperText="Usually 2.0-3.0%"
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
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Desired Ratios </Box>
            <Box component="div" className={classes.buttonWrapper}>
              <Box component="span" fontWeight="fontWeightLight">Set Ratio Defaults: </Box>
              {ageOptions.map(option => (
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
          <Paper elevation={0} square>     
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Bone Content</Box>    
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="bone">RMB Type</InputLabel>
              <NativeSelect
                className={classes.nativeSelect}
                name="boneType"
                id="bone"
                onChange={e => setBoneType(Number(e.target.value))}
                defaultValue={rmbOptions[0].value}
              >
                {rmbOptions.map(option => (
                  <option key={option.key} value={option.value}>{option.name}</option> 
                ))}
              </NativeSelect>
            </FormControl>
            <TextField
              className={{[classes.numericLarge]: true, [classes.hidden]: (boneType === 0)}}
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
            <TextField
              className={{[classes.numericLarge]: true, [classes.hidden]: (boneType !== 0)}}
              id="customBoneRatio" 
              label="Enter RMB %"
              value={customRMB}
              type="number"
              onChange={e => setCustomRMB(Number(e.target.value))}
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
            customRMB={customRMB}
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