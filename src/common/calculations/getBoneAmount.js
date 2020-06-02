import round from './round';
import toPercent from './toPercent';

const getBoneAmount = (amount, bonePercent, boneType) => {
  const newBoneAmount = (amount * toPercent(bonePercent)) / toPercent(boneType);  
  return round(newBoneAmount);
};

export default getBoneAmount;