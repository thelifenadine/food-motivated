import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
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
    },
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
  title,
}) => {
  const classes = useStyles();
  const createCellContent = getCellContentCreator(unitDetails);

  return (
    <Section> 
      <Header2>{title}</Header2>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.firstRow}>Total Amount</td>
            <td className={classes.firstRow} align="right">{createCellContent(totalAmount)}</td>
          </tr>
          <tr>
            <td>Boneless Meat</td>
            <td align="right">{createCellContent(muscleAmount)}</td>
          </tr>
          <tr>
            <td>Raw Meaty Bone at {rmbPercent}%</td>
            <td align="right">{createCellContent(boneAmount)}</td>
          </tr>
          {map(otherAmounts, (value, key) => (
            <tr key={key}>
              <td>{key}</td>
              <td align="right">{createCellContent(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
};

export default AmountsTable;
