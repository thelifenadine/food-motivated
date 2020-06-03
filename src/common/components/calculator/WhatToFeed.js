import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AmountsTable from './AmountsTable';
import BulkHelper from './BulkHelper';

import getBoneAmount from '../../calculations/getBoneAmount';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import getAmountByPercent from '../../calculations/getAmountByPercent.js';

const WhatToFeed = ({
  totalDailyAmount,
  rmbPercent,
  percentages,
  unitDetails,
}) => {
  const { bone, organ, liver, veggie, seed, fruit } = percentages;
  const [shouldShowBulkTable, setShowBulkTable] = useState(false);

  const [boneAmount, setBoneAmount] = useState(getBoneAmount(totalDailyAmount, bone, rmbPercent));
  const [liverAmount, setLiverAmount] = useState(getAmountByPercent(totalDailyAmount, liver));
  const [organAmount, setOrganAmount] = useState(getAmountByPercent(totalDailyAmount, organ));

  const [vegAmount, setVegAmount] = useState(getAmountByPercent(totalDailyAmount, veggie));
  const [seedAmount, setSeedAmount] = useState(getAmountByPercent(totalDailyAmount, seed));
  const [fruitAmount, setFruitAmount] = useState(getAmountByPercent(totalDailyAmount, fruit));
  const [muscleAmount, setMuscleAmount] = useState(
    getMuscleAmount(totalDailyAmount, [boneAmount, organAmount, liverAmount, vegAmount, fruitAmount, seedAmount])
  );

  useEffect(() => {
    setBoneAmount(getBoneAmount(totalDailyAmount, bone, rmbPercent));
  }, [totalDailyAmount, bone, rmbPercent]);

  useEffect(() => {
    setOrganAmount(getAmountByPercent(totalDailyAmount, organ));
  }, [totalDailyAmount, organ]);

  useEffect(() => {
    setLiverAmount(getAmountByPercent(totalDailyAmount, liver));
  }, [totalDailyAmount, liver]);

  useEffect(() => {
    setVegAmount(getAmountByPercent(totalDailyAmount, veggie));
  }, [totalDailyAmount, veggie]);

  useEffect(() => {
    setSeedAmount(getAmountByPercent(totalDailyAmount, seed));
  }, [totalDailyAmount, seed]);

  useEffect(() => {
    setFruitAmount(getAmountByPercent(totalDailyAmount, fruit));
  }, [totalDailyAmount, fruit]);

  useEffect(() => {
    setMuscleAmount(getMuscleAmount(totalDailyAmount, [boneAmount, organAmount, liverAmount, vegAmount, seedAmount, fruitAmount]));
    setShowBulkTable(false);
  }, [totalDailyAmount, boneAmount, organAmount, liverAmount, vegAmount, seedAmount, fruitAmount]);

  return (
    <React.Fragment>
      <AmountsTable 
        totalAmount={totalDailyAmount}
        muscleAmount={muscleAmount}
        boneAmount={boneAmount}
        rmbPercent={rmbPercent}
        liverAmount={liverAmount}
        organAmount={organAmount}
        vegAmount={vegAmount}
        seedAmount={seedAmount}
        fruitAmount={fruitAmount}
        unitDetails={unitDetails}
        title="What to feed each day"
      />      
      <BulkHelper
        totalDailyAmount={totalDailyAmount}
        muscleAmount={muscleAmount}
        boneAmount={boneAmount}
        rmbPercent={rmbPercent}
        liverAmount={liverAmount}
        organAmount={organAmount}
        vegAmount={vegAmount}
        seedAmount={seedAmount}
        fruitAmount={fruitAmount}
        unitDetails={unitDetails}
        shouldShowBulkTable={shouldShowBulkTable}
        setShowBulkTable={setShowBulkTable}
      />
    </React.Fragment>
  );
};

WhatToFeed.propTypes = {
  totalDailyAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  percentages: PropTypes.object.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default WhatToFeed;
