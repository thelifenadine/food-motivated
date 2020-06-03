import toPercent from './toPercent';

const getAmountByPercent = (amount, percentAmount) => {
  return amount * toPercent(percentAmount);
};

export default getAmountByPercent;