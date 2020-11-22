import getMuscleAmount from './getMuscleAmount';
import getBoneAmount from './getBoneAmount';
import getAmountsByPercents from './getAmountsByPercents';
/*
  This function calculates the breakdown of the amounts to feed

  The arguments passed in update the following:
  totalDailyAmount: all
  rmbPercent: muscle & bone
  bonePercentage: muscle & bone
  otherPercentages: muscle & other

  The muscle amount auto balances as the other portions change
*/
const getAmounts = (totalDailyAmount, rmbPercent, percentages) => {
  const { bonePercentage, otherPercentages } = percentages;

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
