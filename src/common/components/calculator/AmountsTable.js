import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import round from '../../calculations/round';
import useStyles from '../../styles/useStyles';

const DailyTable = (props) => {
  const { 
    muscleAmount,
    boneAmount,
    rmbPercent,
    liverAmount,
    organAmount,
    vegAmount,
    seedAmount,
    fruitAmount,
    unitDetails,
    title,
  } = props;
  const classes = useStyles();

  const addedContent = (amount) => (
    (amount < unitDetails.perUnit) ? '' : `${round(amount / unitDetails.perUnit)} ${unitDetails.lg} / `
  );

  return (
    <Paper elevation={0} square> 
      <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>{title}</Box>
      <Table className={classes.table} size="small">
        <TableBody>
          <TableRow>
            <TableCell>Boneless Meat</TableCell>
            <TableCell align="right">{`${addedContent(muscleAmount)}${muscleAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Raw Meaty Bone at {rmbPercent}%</TableCell>
            <TableCell align="right">{`${addedContent(boneAmount)}${boneAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Liver</TableCell>
            <TableCell align="right">{`${addedContent(liverAmount)}${liverAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Organ</TableCell>
            <TableCell align="right">{`${addedContent(organAmount)}${organAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vegetables</TableCell>
            <TableCell align="right">{`${addedContent(vegAmount)}${vegAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nuts/Seeds</TableCell>
            <TableCell align="right">{`${addedContent(seedAmount)}${seedAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lastRow}>Fruit</TableCell>
            <TableCell className={classes.lastRow} align="right">{`${addedContent(fruitAmount)}${fruitAmount} ${unitDetails.sm}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

DailyTable.propTypes = {
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  liverAmount: PropTypes.number.isRequired,
  organAmount: PropTypes.number.isRequired,
  vegAmount: PropTypes.number.isRequired,
  seedAmount: PropTypes.number.isRequired,
  fruitAmount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DailyTable;
