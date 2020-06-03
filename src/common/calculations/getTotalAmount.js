import toPercent from './toPercent';

const getTotalAmount = (weight, maintenancePercentage, unitAmount = 16) => {
  const weightByUnit = weight * unitAmount;
  const totalAmountInOunces = weightByUnit * toPercent(maintenancePercentage);
  return totalAmountInOunces;
};

export default getTotalAmount;