import getMuscleAmount from './getMuscleAmount';
import getBoneAmount from './getBoneAmount';
import getAmountsByPercents from './getAmountsByPercents';

const getAmounts = (totalDailyAmount, bonePercentage, rmbPercent, otherPercentages) => {
  const updatedBoneAmount = getBoneAmount(totalDailyAmount, bonePercentage, rmbPercent);
  const updatedOtherAmounts = getAmountsByPercents(totalDailyAmount, otherPercentages); 
  const updatedMuscleAmount = getMuscleAmount(totalDailyAmount, updatedBoneAmount, updatedOtherAmounts);

  return {
    otherAmounts: updatedOtherAmounts,
    boneAmount: updatedBoneAmount,
    muscleAmount: updatedMuscleAmount,
  };
};

export default getAmounts;