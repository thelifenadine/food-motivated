import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow, TableCell, makeStyles } from '@material-ui/core';
import round from '../../calculations/round';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles(() => ({
  firstRow: {
    fontWeight: 600,
  },
  lastRow: {
    borderBottom: '#fff solid 1px',
  },
}));

const getCellContentCreator = (unitDetails) => (amount) => {
  const smallUnitAmount = `${round(amount)} ${unitDetails.sm}`;

  if (amount < unitDetails.perUnit) {
    return smallUnitAmount;
  }

  return `${round(amount / unitDetails.perUnit)} ${unitDetails.lg} / ${smallUnitAmount}`;  
};

const AmountsTable = ({ 
  totalAmount,
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
}) => {
  const classes = useStyles();
  const createCellContent = getCellContentCreator(unitDetails);

  return (
    <Section> 
      <Header2>{title}</Header2>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell className={classes.firstRow}>Total Amount</TableCell>
            <TableCell className={classes.firstRow} align="right">{createCellContent(totalAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Boneless Meat</TableCell>
            <TableCell align="right">{createCellContent(muscleAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Raw Meaty Bone at {rmbPercent}%</TableCell>
            <TableCell align="right">{createCellContent(boneAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Liver</TableCell>
            <TableCell align="right">{createCellContent(liverAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Organ</TableCell>
            <TableCell align="right">{createCellContent(organAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vegetables</TableCell>
            <TableCell align="right">{createCellContent(vegAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nuts/Seeds</TableCell>
            <TableCell align="right">{createCellContent(seedAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.lastRow}>Fruit</TableCell>
            <TableCell className={classes.lastRow} align="right">{createCellContent(fruitAmount)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Section>
  );
};

AmountsTable.propTypes = {
  totalAmount: PropTypes.number.isRequired,
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

export default AmountsTable;
