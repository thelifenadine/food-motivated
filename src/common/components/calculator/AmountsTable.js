import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import round from '../../calculations/round';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  firstRow: {
    fontWeight: 600,
  },
  table: {
    margin: theme.spacing(1),
    '& > tbody tr td': {
      borderBottom: '1px solid #eee',
      paddingLeft: 0,
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(.5),
      paddingTop: theme.spacing(.5),
    },
  },
  capitalize: {
    textTransform: 'capitalize',
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
  otherAmounts,
  unitDetails,
  essentialNutrients,
  lastSavedLifestage,
  title,
}) => {
  const classes = useStyles();
  const createCellContent = getCellContentCreator(unitDetails);

  return (
    <Section>
      <Header2>{title}</Header2>
      <Table className={classes.table}>
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
          {map(otherAmounts, (value, key) => (
            <TableRow key={key}>
              <TableCell className={classes.capitalize}>{key}</TableCell>
              <TableCell align="right">{createCellContent(value)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className={classes.firstRow}>Essential Nutrients</TableCell>
            <TableCell className={classes.firstRow} align="right">{`Recommended Amounts (${lastSavedLifestage})`}</TableCell>
          </TableRow>
          {map(essentialNutrients, (nutrientInfo, key) => (
            <TableRow key={key}>
              <TableCell className={classes.capitalize}>{nutrientInfo.name}</TableCell>
              <TableCell align="right">{`${round(nutrientInfo[lastSavedLifestage], 1)} ${nutrientInfo.unit}`}</TableCell>
            </TableRow>
          ))}
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
  otherAmounts: PropTypes.object.isRequired,
  unitDetails: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  lastSavedLifestage: PropTypes.string.isRequired,
  essentialNutrients: PropTypes.object.isRequired,
};

export default AmountsTable;
