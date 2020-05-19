import lodashRound from 'lodash/round';

// wrapper for lodash/round that defaults the decimal place to 1
const round = (amount, to = 1) => {
  return lodashRound(amount, to);
};

export default round;