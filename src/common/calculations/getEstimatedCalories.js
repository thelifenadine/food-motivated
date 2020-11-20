/*
  amountPer1000kCal is determined by the unit options
    19 oz per 1000kcal
    538 g per 1000kcal

  totalAmount is the weight of the totalDailyAmount
  to be fed (either in ounces or grams)
*/

const getEstimatedCalories = (amountPer1000kCal, totalAmount) => {
  const calPerUnit = 1000 / amountPer1000kCal;
  return calPerUnit * totalAmount;
};


export default getEstimatedCalories;
