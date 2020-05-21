import round from '../../calculations/round';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { 
  Grid, FormControl, NativeSelect, InputLabel, Paper, InputAdornment, Box, TextField, Button, Hidden
} from '@material-ui/core';

import WhatToFeed from './WhatToFeed';
import toPercent from '../../calculations/toPercent';
import rmbOptions from '../../form/rawMeatyBoneOptions';
import ratioDefaultOptions, { ratioDefaultData } from '../../form/ratioDefaultOptions';
import unitOptions, { unitData } from '../../form/unitOptions';
import useStyles from '../../styles/useStyles';

const getTotalAmount = (weight, maintenancePercentage, unitAmount = 16) => {
  const weightByUnit = weight * unitAmount;
  const totalAmountInOunces = weightByUnit * toPercent(maintenancePercentage);
  return round(totalAmountInOunces);
};

const DogCalculator = () => {
  const classes = useStyles();

  const [weight, setWeight] = useState(68);
  const [maintenance, setMaintenance] = useState(2.5);
  const [age, setAge] = useState('barfAdult');

  const [muscleRatio, setMuscleRatio] = useState(ratioDefaultData[age].muscle);
  const [boneRatio, setBoneRatio] = useState(ratioDefaultData[age].bone);
  const [liverRatio, setLiverRatio] = useState(ratioDefaultData[age].liver);
  const [organRatio, setOrganRatio] = useState(ratioDefaultData[age].organ);
  const [veggieRatio, setVeggieRatio] = useState(ratioDefaultData[age].veggie);
  const [seedRatio, setSeedRatio] = useState(ratioDefaultData[age].seed);
  const [fruitRatio, setFruitRatio] = useState(ratioDefaultData[age].fruit);

  const [customRMB, setCustomRMB] = useState(0);
  const [rmbPercent, setBoneType] = useState(rmbOptions[0].value);
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
    setBoneRatio(ratioDefaultData[age].bone);
    setLiverRatio(ratioDefaultData[age].liver);
    setOrganRatio(ratioDefaultData[age].organ);
    setVeggieRatio(ratioDefaultData[age].veggie);
    setSeedRatio(ratioDefaultData[age].seed);
    setFruitRatio(ratioDefaultData[age].fruit);
  }, [age]);

  useEffect(() => {
    const newMuscleRatio = 100 - (boneRatio + liverRatio + organRatio + veggieRatio + seedRatio + fruitRatio);
    setMuscleRatio(newMuscleRatio);
  }, [boneRatio, liverRatio, organRatio, veggieRatio, seedRatio, fruitRatio]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Hidden mdUp implementation="css">
          <Grid item xs={12}>
            <Paper elevation={0} square> 
              <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1} mb={0}>
                Ads to pay for this website - DONATE
                Create account and name for the website, then paypal.me link
              </Box>
            </Paper>
          </Grid>
        </Hidden>
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
                  <InputAdornment position="end">{unitDetails.lg}</InputAdornment>
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
              id="amount" 
              label="Daily Amount"
              value={amount}
              type="number"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{unitDetails.sm}</InputAdornment>
                ),
              }}
            />  
          </Paper>
          <Paper elevation={0} square> 
            <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Desired Ratios </Box>
            <Box component="div" className={classes.buttonWrapper}>
              <Box component="span" fontWeight="fontWeightLight">Reset defaults for: </Box>
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
                name="rmbPercent"
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
              className={classnames({[classes.numericLarge]: true, [classes.hidden]: (rmbPercent === 0)})}
              id="boneRatio" 
              label="RMB Ratio"
              value={rmbPercent}
              type="number"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                ),
              }}
            />
            <TextField
              className={classnames({[classes.numericLarge]: true, [classes.hidden]: (rmbPercent !== 0)})}
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
        <Grid item xs={12} sm={6}>
          <Hidden smDown implementation="css">
            <Paper elevation={0} square> 
              <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>
                Ads to pay for this website - DONATE
                Create account and name for the website, then paypal.me link
              </Box>
            </Paper>
          </Hidden>
          <WhatToFeed 
            amount={amount}
            customRMB={customRMB}
            rmbPercent={rmbPercent}
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