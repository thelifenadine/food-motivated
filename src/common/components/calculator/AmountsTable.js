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

const ContentCell = ({ unitDetails, amount }) => {
  if (amount < unitDetails.perUnit) {
    return (
      <Translate>
        {({ translate }) => (
          <React.Fragment>{`${round(amount)} ${translate(`units.${unitDetails.sm}`)}`}</React.Fragment>
        )}
      </Translate>
    );
  }

  return (
    <Translate>
      {({ translate }) => (
        translate(`units.${unitDetails.lg}-${unitDetails.sm}`, {
          large: round(amount / unitDetails.perUnit),
          small: round(amount),
        })
      )}
    </Translate>
  );
};

ContentCell.propTypes = {
  amount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
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

  return (
    <Translate>
      {({ translate }) => (
        <Section>
          <Header2>{title}</Header2>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell className={classes.firstRow} data-testid="totalAmountLabel">
                  {translate('amountsTable.total-amount')}
                </TableCell>
                <TableCell className={classes.firstRow} align="right" data-testid="totalAmount">
                  <ContentCell unitDetails={unitDetails} amount={totalDailyAmount} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell data-testid="muscleAmountLabel">{translate('amountsTable.boneless-meat')}</TableCell>
                <TableCell align="right" data-testid="muscleAmount">
                  <ContentCell unitDetails={unitDetails} amount={muscleAmount} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell data-testid="boneAmountLabel">{translate('amountsTable.raw-meaty-bone-at-amount', { amount: rmbPercent })}</TableCell>
                <TableCell align="right" data-testid="boneAmount">
                  <ContentCell unitDetails={unitDetails} amount={boneAmount} />
                </TableCell>
              </TableRow>
              {map(otherAmounts, (value, key) => (
                <TableRow key={key} data-testid="otherAmounts">
                  <TableCell className={classes.capitalize} data-testid={`${key}AmountLabel`}>{translate(`percentageOptions.${key}`)}</TableCell>
                  <TableCell align="right" data-testid={`${key}Amount`}>
                    <ContentCell unitDetails={unitDetails} amount={value} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className={classes.firstRow}>{translate('amountsTable.essential-nutrients')}</TableCell>
                <TableCell className={classes.firstRow} align="right">{translate('amountsTable.recommended-amounts', { lifestage: translate(`amountsTable.${lastSavedLifestage}`)})}</TableCell>
              </TableRow>
              {map(essentialNutrients, (nutrientInfo, key) => (
                <TableRow key={key}>
                  <TableCell className={classes.capitalize} data-testid={`${key}Label`}> {translate(`amountsTable.${key}`)} </TableCell>
                  <TableCell align="right" data-testid={`${key}Amount`}>{`${round(nutrientInfo[lastSavedLifestage], 2)} ${translate(`units.${nutrientInfo.unit}`)}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      )}
    </Translate>
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
