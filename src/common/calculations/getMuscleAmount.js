const getMuscleAmount = (totalAmount, nonMuscleAmounts) => {
  const sum = nonMuscleAmounts.reduce((a, b) => (a + b), 0);
  return totalAmount - sum;
};

export default getMuscleAmount;