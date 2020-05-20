import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core';
import round from '../../calculations/round';

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

const DailyTable = (props) => {
  const { 
    muscleAmount,
    boneAmount,
    liverAmount,
    organAmount,
    vegAmount,
    seedAmount,
    fruitAmount,
    totalVegAmount,
    unitDetails,
    title,
  } = props;
  const classes = useStyles();

  const addedContent = (amount) => (
    (amount < unitDetails.perUnit) ? '' : `${round(amount / unitDetails.perUnit)} ${unitDetails.dog} / `
  );

  return (
    <Paper elevation={0} square> 
      <Box component="h3" fontWeight="fontWeightLight" mx={1} pt={1}>{title}</Box>
      <Table className={classes.table} size="small">
        <TableBody>
          <TableRow>
            <TableCell>Boneless Meat</TableCell>
            <TableCell align="right">{`${addedContent(muscleAmount)}${muscleAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Raw Meaty Bone</TableCell>
            <TableCell align="right">{`${addedContent(boneAmount)}${boneAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Liver</TableCell>
            <TableCell align="right">{`${addedContent(liverAmount)}${liverAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Organ</TableCell>
            <TableCell align="right">{`${addedContent(organAmount)}${organAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vegetables</TableCell>
            <TableCell align="right">{`${addedContent(vegAmount)}${vegAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nuts/Seeds</TableCell>
            <TableCell align="right">{`${addedContent(seedAmount)}${seedAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fruit</TableCell>
            <TableCell align="right">{`${addedContent(fruitAmount)}${fruitAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lastRow}>Total Veg/Fruit/Seeds</TableCell>
            <TableCell className={classes.lastRow} align="right">{`${addedContent(totalVegAmount)}${totalVegAmount} ${unitDetails.food}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

DailyTable.propTypes = {
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  liverAmount: PropTypes.number.isRequired,
  organAmount: PropTypes.number.isRequired,
  vegAmount: PropTypes.number.isRequired,
  seedAmount: PropTypes.number.isRequired,
  fruitAmount: PropTypes.number.isRequired,
  totalVegAmount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DailyTable;
