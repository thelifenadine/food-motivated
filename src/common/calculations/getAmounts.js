import mapValues from 'lodash/mapValues';

import getMuscleAmount from './getMuscleAmount';
import getAmountByPercent from './getAmountByPercent.js';
import getBoneAmount from './getBoneAmount';

const getAmounts = (totalDailyAmount, bonePercentage, rmbPercent, otherPercentages) => {
  const updatedBoneAmount = getBoneAmount(totalDailyAmount, bonePercentage, rmbPercent);
  const updatedOtherAmounts = mapValues(otherPercentages, value => getAmountByPercent(totalDailyAmount, value));
  const updatedMuscleAmount = getMuscleAmount(totalDailyAmount, updatedBoneAmount, updatedOtherAmounts);

  return {
    otherAmounts: updatedOtherAmounts,
    boneAmount: updatedBoneAmount,
    muscleAmount: updatedMuscleAmount,
  };
};

export default getAmounts;