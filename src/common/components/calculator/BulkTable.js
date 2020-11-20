import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AmountsTable from './AmountsTable';
import { mapCalculatedNutrients } from '../../calculations/getEssentialNutrients';
import getBulkOther from '../../calculations/getBulkOther';

const BulkTable = (props) => {
  const {
    totalDailyAmount,
    muscleAmount,
    boneAmount,
    otherAmounts,
    unitDetails,
    rmbPercent,
    numDays,
    essentialNutrients,
    lastSavedLifestage,
  } = props;

  const [totalAmountBulk, setTotalBulkAmount] = useState(totalDailyAmount * numDays);
  const [boneAmountBulk, setBoneBulkAmount] = useState(boneAmount * numDays);
  const [otherAmountsBulk, setOtherBulkAmount] = useState(getBulkOther(otherAmounts, numDays));
  const [essentialNutrientsBulk, setNutrientBulkAmount] = useState(mapCalculatedNutrients(essentialNutrients, numDays));
  const [muscleAmountBulk, setMuscleBulkAmount] = useState(muscleAmount * numDays);

  useEffect(() => {
    setOtherBulkAmount(getBulkOther(otherAmounts, numDays));
    setNutrientBulkAmount(mapCalculatedNutrients(essentialNutrients, numDays));
    setTotalBulkAmount(totalDailyAmount * numDays);
    setBoneBulkAmount(boneAmount * numDays);
    setMuscleBulkAmount(muscleAmount * numDays);
  }, [numDays]);

  return (
    <AmountsTable
      totalDailyAmount={totalAmountBulk}
      muscleAmount={muscleAmountBulk}
      boneAmount={boneAmountBulk}
      otherAmounts={otherAmountsBulk}
      unitDetails={unitDetails}
      rmbPercent={rmbPercent}
      essentialNutrients={essentialNutrientsBulk}
      lastSavedLifestage={lastSavedLifestage}
      title={`Bulk Amounts for ${numDays} days`}
    />
  );
};

BulkTable.propTypes = {
  totalDailyAmount: PropTypes.number.isRequired,
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  otherAmounts: PropTypes.object.isRequired,
  unitDetails: PropTypes.object.isRequired,
  numDays: PropTypes.number.isRequired,
  essentialNutrients: PropTypes.object.isRequired,
  lastSavedLifestage: PropTypes.string.isRequired,
};

export default BulkTable;
