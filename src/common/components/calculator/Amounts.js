import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Button, TextField, InputAdornment, makeStyles } from '@material-ui/core';

import DailyTable from './DailyTable';
import BulkTable from './BulkTable';
import getBoneAmount from '../../calculations/getBoneAmount';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import getPercentage from '../../calculations/getPercentage';

const useStyles = makeStyles((theme) => ({
  table: {
    borderBottom: '#eee solid 1px',
  },
  lastRow: {
    fontStyle: 'italic',
    color: '#aaa',
    borderBottom: '#fff solid 1px',
  },
  buttonWrapper: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControlWide: {
    width: 150,
    margin: theme.spacing(1),
  },
}));

const Amounts = (props) => {
  const { 
    amount,
    boneType,
    customRMB,
    boneRatio, 
    organRatio, 
    liverRatio, 
    veggieRatio,
    seedRatio,
    fruitRatio,
    unitDetails,
  } = props;

  const classes = useStyles();
  const [boneAmount, setBoneAmount] = useState(getBoneAmount(amount, boneRatio, boneType));
  const [liverAmount, setLiverAmount] = useState(getPercentage(amount, liverRatio));
  const [organAmount, setOrganAmount] = useState(getPercentage(amount, organRatio));

  const [vegAmount, setVegAmount] = useState(getPercentage(amount, veggieRatio));
  const [seedAmount, setSeedAmount] = useState(getPercentage(amount, seedRatio));
  const [fruitAmount, setFruitAmount] = useState(getPercentage(amount, fruitRatio));
  const [totalVegAmount, setTotalVegAmount] = useState(getPercentage(amount, (veggieRatio + seedRatio + fruitRatio)));
  const [muscleAmount, setMuscleAmount] = useState(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));

  const [numDays, setNumDays] = useState(7);
  const [showBulk, setShowBulk] = useState(false);

  useEffect(() => {
    const bonePerc = customRMB || boneType;

    setBoneAmount(getBoneAmount(amount, boneRatio, bonePerc));
  }, [amount, boneRatio, boneType, customRMB]);

  useEffect(() => {
    setOrganAmount(getPercentage(amount, organRatio));
  }, [amount, organRatio]);

  useEffect(() => {
    setLiverAmount(getPercentage(amount, liverRatio));
  }, [amount, liverRatio]);

  useEffect(() => {
    setVegAmount(getPercentage(amount, veggieRatio));
  }, [amount, veggieRatio]);

  useEffect(() => {
    setSeedAmount(getPercentage(amount, seedRatio));
  }, [amount, seedRatio]);

  useEffect(() => {
    setFruitAmount(getPercentage(amount, fruitRatio));
  }, [amount, fruitRatio]);

  useEffect(() => {
    const totalVeggies = veggieRatio + seedRatio + fruitRatio;
    setTotalVegAmount(getPercentage(amount, totalVeggies));
  }, [amount, veggieRatio, seedRatio, fruitRatio]);

  useEffect(() => {
    setMuscleAmount(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));
    setShowBulk(false);
  }, [amount, boneAmount, organAmount, liverAmount, totalVegAmount]);

  return (
    <React.Fragment>
      <DailyTable 
        muscleAmount={muscleAmount}
        boneAmount={boneAmount}
        liverAmount={liverAmount}
        organAmount={organAmount}
        vegAmount={vegAmount}
        seedAmount={seedAmount}
        fruitAmount={fruitAmount}
        totalVegAmount={totalVegAmount}
        unitDetails={unitDetails}
        title="What to feed each day"
      />      
      <Paper elevation={0} square> 
       <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>Bulk Helper</Box>
        <Box component="div" className={classes.buttonWrapper}>
          <TextField
            className={classes.formControlWide}
            id="numDays" 
            label="How long"
            value={numDays}
            type="number"
            onChange={e => setNumDays(Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">days</InputAdornment>
              ),
            }}
            helperText="minimum of 2 days"
          />
          <Button 
            size="small"
            variant="outlined"
            color="secondary" 
            onClick={() => setShowBulk(true)}
          >
            Generate
          </Button>
        </Box>
        {showBulk && (numDays > 1) &&
          <BulkTable
            muscleAmount={muscleAmount}
            boneAmount={boneAmount}
            liverAmount={liverAmount}
            organAmount={organAmount}
            vegAmount={vegAmount}
            seedAmount={seedAmount}
            fruitAmount={fruitAmount}
            totalVegAmount={totalVegAmount}
            unitDetails={unitDetails}
            numDays={numDays}
            title={`Bulk Amounts for ${numDays} days`}
          />
        }
      </Paper>
    </React.Fragment>
  );
};

Amounts.propTypes = {
  amount: PropTypes.number.isRequired,
  boneType: PropTypes.number.isRequired,
  customRMB: PropTypes.number.isRequired,
  boneRatio: PropTypes.number.isRequired,
  liverRatio: PropTypes.number.isRequired,
  organRatio: PropTypes.number.isRequired,
  veggieRatio: PropTypes.number.isRequired,
  seedRatio: PropTypes.number.isRequired,
  fruitRatio: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default Amounts;
