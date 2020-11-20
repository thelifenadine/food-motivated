import getPresetPercentages from './getPresetPercentages';
import getAmounts from '../../calculations/getAmounts';

/*
  This file simply consolidates the getPresetPercentages and getAmounts
  calculations and returns their properties together
*/
const getNewPercentagesAndAmounts = (state, mealType, lifestage) => {
  const { totalDailyAmount, rmbPercent } = state;
  const updatedPercentages = getPresetPercentages(mealType, lifestage);

  return {
    ...updatedPercentages,
    ...getAmounts(totalDailyAmount, rmbPercent, updatedPercentages),
  };
};

export default getNewPercentagesAndAmounts;
