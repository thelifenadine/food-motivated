import toPercent from './toPercent';

/*
  The weight of the dog, is passed in as either pounds or kilograms.

  The weight is multiplied by it's smaller unit amount, for example 16 (16 oz per lb) to
  get the amount that the dog weights in ounces (or 1000 for grams).

  The maintenance amount to be fed to the dog is passed in as an integer (2, for example)
  and divided by 100 to get it's percentage: 0.02

  The total amount to be fed (per day) is then calculated by multiplying the weight of the
  dog by the calculated percentage to feed and returned in ounces or grams.
*/
const getTotalDailyAmount = (weight, maintenancePercentage, unitAmount = 16) => {
  const weightByUnit = weight * unitAmount;
  const totalAmountInOuncesOrGrams = weightByUnit * toPercent(maintenancePercentage);
  return totalAmountInOuncesOrGrams;
};

export default getTotalDailyAmount;
