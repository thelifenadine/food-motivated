import values from 'lodash/values';

const getMuscleAmount = (total, bone, others) => {
  const sum = bone + values(others).reduce((a, b) => (a + b), 0);
  return total - sum;
};

export const getMusclePercentage = (bonePercentage, otherPercentages) =>
  getMuscleAmount(100, bonePercentage, otherPercentages);

export default getMuscleAmount;
