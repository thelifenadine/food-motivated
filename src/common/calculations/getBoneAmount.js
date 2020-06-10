import toPercent from './toPercent';

const getBoneAmount = (amount, bonePercent, rmbPercent) => {
  const newBoneAmount = (amount * toPercent(bonePercent)) / toPercent(rmbPercent);  
  return newBoneAmount;
};

export default getBoneAmount;