import mapValues from 'lodash/mapValues';
import toPercent from './toPercent';

const getAmountByPercent = (amount, percentAmount) => {
  return amount * toPercent(percentAmount);
};

export default (totalAmount, percentages) => 
  mapValues(percentages, value => getAmountByPercent(totalAmount, value));

