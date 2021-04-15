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
    bulkTitle,
  } = props;

  const [totalAmountBulk, setTotalBulkAmount] = useState(totalDailyAmount * numDays);
  const [boneAmountBulk, setBoneBulkAmount] = useState(boneAmount * numDays);
  const [otherAmountsBulk, setOtherBulkAmount] = useState(getBulkOther(otherAmounts, numDays));
  const [essentialNutrientsBulk, setNutrientBulkAmount] = useState(mapCalculatedNutrients(essentialNutrients, numDays));
  const [muscleAmountBulk, setMuscleBulkAmount] = useState(muscleAmount * numDays);

  const updateAmounts = (days) => {
    setOtherBulkAmount(getBulkOther(otherAmounts, days));
    setNutrientBulkAmount(mapCalculatedNutrients(essentialNutrients, days));
    setTotalBulkAmount(totalDailyAmount * days);
    setBoneBulkAmount(boneAmount * days);
    setMuscleBulkAmount(muscleAmount * days);
  };

  useEffect(() => {
    updateAmounts(numDays);
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
      title={bulkTitle}
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
  bulkTitle: PropTypes.string.isRequired,
};

export default BulkTable;
