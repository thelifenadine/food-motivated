import round from './round';
import toPercent from './toPercent';

const getAmountByPercent = (amount, percentAmount) => {
  const calculated = amount * toPercent(percentAmount);
  return round(calculated);
};

export default getAmountByPercent;