const getEstimatedCalories = (amountPer1000kCal, totalAmount) => {
  const calPerUnit = 1000 / amountPer1000kCal;
  return calPerUnit * totalAmount;
};


export default getEstimatedCalories;
