import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import round from '../../calculations/round';
import { Translate } from 'react-localize-redux';

import Header2 from '../layout/Header2';
import Section from '../layout/Section';

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
  totalDailyAmount,
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
            <TableCell className={classes.firstRow} data-testid="totalAmountLabel">
              <Translate id="amountsTable.total-amount" />
            </TableCell>
            <TableCell className={classes.firstRow} align="right" data-testid="totalAmount">
              {createCellContent(totalDailyAmount)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell data-testid="muscleAmountLabel"><Translate id="amountsTable.boneless-meat" /></TableCell>
            <TableCell align="right" data-testid="muscleAmount">{createCellContent(muscleAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell data-testid="boneAmountLabel"><Translate id="amountsTable.raw-meaty-bone-at-amount" data={{ amount: rmbPercent }} /></TableCell>
            <TableCell align="right" data-testid="boneAmount">{createCellContent(boneAmount)}</TableCell>
          </TableRow>
          {map(otherAmounts, (value, key) => (
            <TableRow key={key} data-testid="otherAmounts">
              <TableCell className={classes.capitalize} data-testid={`${key}AmountLabel`}><Translate id={`percentageOptions.${key}`} /></TableCell>
              <TableCell align="right" data-testid={`${key}Amount`}>{createCellContent(value)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className={classes.firstRow}><Translate id="amountsTable.essential-nutrients" /></TableCell>
            <TableCell className={classes.firstRow} align="right"><Translate id="amountsTable.recommended-amounts" /> <Translate id={`amountsTable.${lastSavedLifestage}`}/></TableCell>
          </TableRow>
          {map(essentialNutrients, (nutrientInfo, key) => (
            <TableRow key={key}>
              <TableCell className={classes.capitalize} data-testid={`${key}Label`}><Translate id={`amountsTable.${key}`} /></TableCell>
              <TableCell align="right" data-testid={`${key}Amount`}>{`${round(nutrientInfo[lastSavedLifestage], 2)} ${nutrientInfo.unit}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
};

AmountsTable.propTypes = {
  totalDailyAmount: PropTypes.number.isRequired,
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
