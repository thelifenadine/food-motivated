import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import WhatToFeed from './WhatToFeed';
import RawMeatyBone from './RawMeatyBone';
import BasicOptions from './BasicOptions';
import PercentageOptions from './PercentageOptions';
import getTotalAmount from '../../calculations/getTotalAmount';
import rmbOptions from '../../form/rawMeatyBoneOptions';
import { ratioDefaultData } from '../../form/ratioDefaultOptions';
import { unitData } from '../../form/unitOptions';

const DogMealCalculator = () => {
  const [percentages, setPercentages] = useState(ratioDefaultData['barfAdult']);
  const [rmbPercent, setRmbPercent] = useState(rmbOptions[0].value);
  const [unitDetails, setUnitDetails] = useState(unitData['english']);
  const [totalDailyAmount, setDailyAmount] = useState(getTotalAmount(68, 2.5, unitDetails.perUnit));

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <BasicOptions 
          setUnit={(unitName) => setUnitDetails(unitData[unitName])}
          setDailyAmount={setDailyAmount}
          totalDailyAmount={totalDailyAmount}
          unitDetails={unitDetails}
        />
        <PercentageOptions      
          percentages={percentages}
          setPercentages={setPercentages}
        />
        <RawMeatyBone
          setRmbPercent={setRmbPercent}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <WhatToFeed 
          totalDailyAmount={totalDailyAmount}
          rmbPercent={rmbPercent}
          percentages={percentages}
          unitDetails={unitDetails}
        />
      </Grid>
    </Grid>
  );
};

export default DogMealCalculator;