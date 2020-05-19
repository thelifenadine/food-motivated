import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core';

import getBoneAmount from '../../calculations/getBoneAmount';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import getPercentage from '../../calculations/getPercentage';

const useStyles = makeStyles(() => ({
  table: {
    borderBottom: '#eee solid 1px',
  },
  lastRow: {
    fontStyle: 'italic',
    color: '#aaa',
    borderBottom: '#fff solid 1px',
  },
}));

const Amounts = (props) => {
  const { 
    amount,
    boneType,
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

  useEffect(() => {
    setBoneAmount(getBoneAmount(amount, boneRatio, boneType));
  }, [amount, boneRatio, boneType]);

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
  }, [amount, boneAmount, organAmount, liverAmount, totalVegAmount]);

  return (
    <Paper elevation={0} square className={classes.elevation0}> 
      <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>What to feed each day</Box>
      <Table className={classes.table} size="small">
        <TableBody>
          <TableRow>
            <TableCell>Boneless Meat</TableCell>
            <TableCell align="right">{`${muscleAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Raw Meaty Bone</TableCell>
            <TableCell align="right">{`${boneAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Liver</TableCell>
            <TableCell align="right">{`${liverAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Organ</TableCell>
            <TableCell align="right">{`${organAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vegetables</TableCell>
            <TableCell align="right">{`${vegAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nuts/Seeds</TableCell>
            <TableCell align="right">{`${seedAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fruit</TableCell>
            <TableCell align="right">{`${fruitAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lastRow}>Total Veg/Fruit/Seeds</TableCell>
            <TableCell className={classes.lastRow} align="right">{`${totalVegAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

Amounts.propTypes = {
  amount: PropTypes.number.isRequired,
  boneType: PropTypes.number.isRequired,
  boneRatio: PropTypes.number.isRequired,
  liverRatio: PropTypes.number.isRequired,
  organRatio: PropTypes.number.isRequired,
  veggieRatio: PropTypes.number.isRequired,
  seedRatio: PropTypes.number.isRequired,
  fruitRatio: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default Amounts;
