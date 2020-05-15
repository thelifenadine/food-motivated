import round from 'lodash/round';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, FormHelperText, FormControl, NativeSelect, InputLabel, Input, InputAdornment, Box,
} from '@material-ui/core';

import Amounts from './Amounts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
  },
  formControl2: {
    margin: theme.spacing(1),
    maxWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const createNumbericOptions = (min = 0, max = 100, increment = 1) => {
  const options = [];

  for (let index = min; index <= max; index = index+increment) {
    if (increment < 1) {
      options.push(round(index, 2));    
    } else {
      options.push(index);
    }
  }
  return options;
};

const weightOptions = createNumbericOptions(3, 200);
const maintenancePercentageOptions = createNumbericOptions(0.1, 8.0, 0.100);
const zeroToHundred = createNumbericOptions(1, 100);
const twentyOptions = createNumbericOptions(1, 20);

const rmbOptions = [
  { name: 'Duck Head', value: 75, key: 'duck-head' },
  { name: 'Duck Neck', value: 50, key: 'duck-neck' },
  { name: 'Duck Wing', value: 39, key: 'duck-wing' },
  { name: 'Duck Foot', value: 60, key: 'duck-food' },
  { name: 'Chicken Wing', value: 46, key: 'chicken-wing' },
  { name: 'Chicken Foot', value: 60, key: 'chicken-foot' },
];

const getPercentage = (percentage) => {
  return percentage / 100;
};

const getAmount = (weight, maintenancePercentage) => {
  const amountInOunces = weight * 16 * getPercentage(maintenancePercentage);
  return round(amountInOunces, 1);
};

const DogCalculator = () => {
  const classes = useStyles();
  const [weight, setWeight] = useState(68);
  const [maintenance, setMaintenance] = useState(3);
  const [muscleRatio, setMuscleRatio] = useState(70);
  const [boneRatio, setBoneRatio] = useState(10);
  const [liverRatio, setLiverRatio] = useState(5);
  const [organRatio, setOrganRatio] = useState(5);
  const [veggieRatio, setVeggieRatio] = useState(10);
  const [boneType, setBoneType] = useState(75);
  const [amount, setAmount] = useState(getAmount(weight, maintenance));

  useEffect(() => {
    setAmount(getAmount(weight, maintenance));
  }, [weight, maintenance]);

  useEffect(() => {
    const newMuscleRatio = 100 - (boneRatio + liverRatio + organRatio + veggieRatio);
    setMuscleRatio(newMuscleRatio);
  }, [boneRatio, liverRatio, organRatio, veggieRatio]);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-weight">Weight</InputLabel>
            <NativeSelect
              id="calc-weight"
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
            >
              {weightOptions.map((val) => (
                <option key={val} value={val}>{val} lbs</option> 
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-maintenance">Maintenance</InputLabel>
            <NativeSelect
              id="calc-maintenance"
              value={maintenance}
              onChange={e => setMaintenance(Number(e.target.value))}
            >
              {maintenancePercentageOptions.map((val) => 
                <option key={val} value={val}>{val} %</option>
              )}
            </NativeSelect>
            <FormHelperText>Start between 2 and 3%</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-amount">Amount to feed</InputLabel>
            <Input id="calc-amount" disabled value={`${amount} oz or ${round(amount / 16, 1)} lbs`}/>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>         
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-bone">RMB Type</InputLabel>
            <NativeSelect
              name="boneType"
              id="calc-bone"
              onChange={e => setBoneType(Number(e.target.value))}
              defaultValue={75}
            >
              {rmbOptions.map(option => (
                <option key={option.key} value={option.value}>{option.name}</option> 
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-bone-type">Bone Ratio</InputLabel>
            <Input 
              id="calc-bone-type" 
              disabled 
              value={boneType} 
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}> 
          <Box component="h3">Desired Ratios </Box>
          <FormControl className={classes.formControl2}>
            <InputLabel htmlFor="calc-muscle-ratio">Muscle Ratio</InputLabel>
            <Input name="muscleRatio" id="calc-muscle-ratio" value={muscleRatio}
              disabled
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-boneRatio">Bone</InputLabel>
            <NativeSelect
              name="boneRatio"
              id="calc-bone-ratio"
              value={boneRatio}
              onChange={e => setBoneRatio(Number(e.target.value))}
            >
              {zeroToHundred.map(val => 
                <option key={val} value={val}>{val} %</option>
              )}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-liverRatio">Liver</InputLabel>
            <NativeSelect
              name="liverRatio"
              id="calc-liver-ratio"
              value={liverRatio}
              onChange={e => setLiverRatio(Number(e.target.value))}
            >
              {twentyOptions.map(val => 
                <option key={val} value={val}>{val} %</option>
              )}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-organRatio">Organ</InputLabel>
            <NativeSelect
              name="organRatio"
              id="calc-organ-ratio"
              value={organRatio}
              onChange={e => setOrganRatio(Number(e.target.value))}
            >
              {twentyOptions.map(val => 
                <option key={val} value={val}>{val} %</option>
              )}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="calc-organRatio">Veggies</InputLabel>
            <NativeSelect
              name="veggieRatio"
              id="calc-veg-ratio"
              value={veggieRatio}
              onChange={e => setVeggieRatio(Number(e.target.value))}
            >
              {twentyOptions.map(val => 
                <option key={val} value={val}>{val} %</option>
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Amounts 
          amount={amount}
          boneType={boneType}
          boneRatio={boneRatio}
          organRatio={organRatio}
          liverRatio={liverRatio}
          veggieRatio={veggieRatio}
        />
      </Grid>
    </div>
  );
};

export default DogCalculator;
// could do this if you're not using a lot of effects
// const [inputs, setInput] = useState({
//   muscleRatio: 70,
//   boneRatio: 10,
//   liverRatio: 5,
//   organRatio: 5,
//   vegRatio: 10,
//   muscleAmount: 0,
//   boneType: rmbOptions[0].value,
// });
// const handleNumericInputChange = (event) => {
//   setInput({ ...inputs, [event.target.name]: Number(event.target.value) });
// };