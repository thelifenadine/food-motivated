import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AmountsTable from './AmountsTable';
import BulkHelper from './BulkHelper';

const WhatToFeed = () => {
  const settings = useSelector(state => state.calculator);
  const { totalDailyAmount, unitDetails, boneAmount, muscleAmount, otherAmounts, rmbPercent } = settings;
  const [shouldShowBulkTable, setShowBulkTable] = useState(false);

  useEffect(() => {
    setShowBulkTable(false);
  }, [totalDailyAmount, boneAmount, otherAmounts]);

  return (
    <React.Fragment>
      <AmountsTable 
        totalAmount={totalDailyAmount}
        muscleAmount={muscleAmount}
        boneAmount={boneAmount}
        rmbPercent={rmbPercent}
        otherAmounts={otherAmounts}
        unitDetails={unitDetails}
        title="What to feed each day"
      />      
      <BulkHelper
        totalDailyAmount={totalDailyAmount}
        muscleAmount={muscleAmount}
        boneAmount={boneAmount}
        rmbPercent={rmbPercent}
        otherAmounts={otherAmounts}
        unitDetails={unitDetails}
        shouldShowBulkTable={shouldShowBulkTable}
        setShowBulkTable={setShowBulkTable}
      />
    </React.Fragment>
  );
};

export default WhatToFeed;
