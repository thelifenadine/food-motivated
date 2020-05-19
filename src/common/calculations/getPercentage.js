import round from './round';
import toPercent from './toPercent';

const getPercentage = (amount, percentAmount) => {
  const calculated = amount * toPercent(percentAmount);
  return round(calculated);
};

export default getPercentage;