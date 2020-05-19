import round from './round';

const getMuscleAmount = (amount, boneAmount, organAmount, liverAmount, totalVegAmount) => {
  const newMuscleAmount = amount - boneAmount - organAmount - liverAmount - totalVegAmount;
  return round(newMuscleAmount);
};

export default getMuscleAmount;