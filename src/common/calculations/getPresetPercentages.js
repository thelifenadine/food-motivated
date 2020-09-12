import { percentageDefaults } from '../form/percentageDefaultOptions';
import getAmounts from './getAmounts';

const getPresetPercentages = (state, mealType, age) => {
  const { totalDailyAmount, rmbPercent } = state;
  const { muscle, bone, other } = percentageDefaults[mealType][age];

  return {
    otherPercentages: other,
    bonePercentage: bone,
    musclePercentage: muscle,
    ...getAmounts(totalDailyAmount, bone, rmbPercent, other),
  };
};

export default getPresetPercentages;
