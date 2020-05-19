import round from './round';
import toPercent from './toPercent';

const getBoneAmount = (amount, boneRatio, boneType) => {
  const newBoneAmount = (amount * toPercent(boneRatio)) / toPercent(boneType);  
  return round(newBoneAmount);
};

export default getBoneAmount;