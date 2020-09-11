import toPercent from './toPercent';

const getBoneAmount = (amount, bonePercent, rmbPercent) => {
  if (rmbPercent === 0) return 0;

  const newBoneAmount = (amount * toPercent(bonePercent)) / toPercent(rmbPercent);
  return newBoneAmount;
};

export default getBoneAmount;
