import toPercent from './toPercent';

const getBoneAmount = (amount, bonePercent, boneType) => {
  const newBoneAmount = (amount * toPercent(bonePercent)) / toPercent(boneType);  
  return newBoneAmount;
};

export default getBoneAmount;