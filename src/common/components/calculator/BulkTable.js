import mapValues from 'lodash/mapValues';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AmountsTable from './AmountsTable';

const getUpdatedOther = (otherAmounts, numDays) => mapValues(otherAmounts, value => value * numDays);

const BulkHelper = (props) => {
  const {
    totalDailyAmount,
    muscleAmount,
    boneAmount,
    otherAmounts,
    unitDetails,
    rmbPercent,
    numDays,
    age,
    estimatedCalories,
  } = props;

  const [totalAmountUpdated, setTotalUpdatedAmount] = useState(totalDailyAmount * numDays);
  const [boneAmountUpdated, setBoneUpdatedAmount] = useState(boneAmount * numDays);
  const [otherAmountsUpdated, setOtherUpdatedAmount] = useState(getUpdatedOther(otherAmounts, numDays));
  const [muscleAmountUpdated, setMuscleUpdatedAmount] = useState(muscleAmount * numDays);

  useEffect(() => {
    setOtherUpdatedAmount(getUpdatedOther(otherAmounts, numDays));
    setTotalUpdatedAmount(totalDailyAmount * numDays);
    setBoneUpdatedAmount(boneAmount * numDays);
    setMuscleUpdatedAmount(muscleAmount * numDays);
  }, [numDays]);

  return (
    <AmountsTable
      totalAmount={totalAmountUpdated}
      muscleAmount={muscleAmountUpdated}
      boneAmount={boneAmountUpdated}
      otherAmounts={otherAmountsUpdated}
      unitDetails={unitDetails}
      rmbPercent={rmbPercent}
      age={age}
      estimatedCalories={estimatedCalories}
      title={`Bulk Amounts for ${numDays} days`}
    />
  );
};

BulkHelper.propTypes = {
  totalDailyAmount: PropTypes.number.isRequired,
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  otherAmounts: PropTypes.object.isRequired,
  unitDetails: PropTypes.object.isRequired,
  age: PropTypes.string.isRequired,
  numDays: PropTypes.number.isRequired,
  estimatedCalories: PropTypes.number.isRequired,
};

export default BulkHelper;
