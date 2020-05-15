import lodashRound from 'lodash/round';

export const round = (amount, to = 1) => {
  return lodashRound(amount, to);
}

export const getPercentage = (percentage) => {
  return percentage / 100;
};

export const getAmountPercentage = (percentage, amount) => {
  return amount * getPercentage(percentage);
};

export const getRoundedAmount = (amount, percentage) => {
  const calculated = getAmountPercentage(amount, percentage);
  return round(calculated);
};

export const getBoneAmount = (amount, boneRatio, boneType) => {
  const newBoneAmount = (getAmountPercentage(amount, boneRatio)) / getPercentage(boneType);
  return round(newBoneAmount);
};

export const getMuscleAmount = (amount, boneAmount, organAmount, liverAmount, totalVegAmount) => {
  const newMuscleAmount = amount - boneAmount - organAmount - liverAmount - totalVegAmount;
  return round(newMuscleAmount);
};

