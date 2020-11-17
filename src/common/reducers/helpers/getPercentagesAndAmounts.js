import getPresetPercentages from './getPresetPercentages';
import getAmounts from '../../calculations/getAmounts';

const getPercentagesAndAmounts = (state, mealType, lifestage) => {
  const { totalDailyAmount, rmbPercent } = state;
  const updatedPercentages = getPresetPercentages(mealType, lifestage);

  return {
    ...updatedPercentages,
    ...getAmounts(totalDailyAmount, rmbPercent, updatedPercentages),
  };
};

export default getPercentagesAndAmounts;
