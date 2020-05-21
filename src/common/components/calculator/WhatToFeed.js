import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AmountsTable from './AmountsTable';
import BulkHelper from './BulkHelper';
import getBoneAmount from '../../calculations/getBoneAmount';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import getPercentage from '../../calculations/getPercentage';

const WhatToFeed = (props) => {
  const { 
    amount,
    rmbPercent,
    customRMB,
    boneRatio, 
    organRatio, 
    liverRatio, 
    veggieRatio,
    seedRatio,
    fruitRatio,
    unitDetails,
  } = props;

  const [shouldShowBulkTable, setShowBulkTable] = useState(false);

  const [boneAmount, setBoneAmount] = useState(getBoneAmount(amount, boneRatio, rmbPercent));
  const [liverAmount, setLiverAmount] = useState(getPercentage(amount, liverRatio));
  const [organAmount, setOrganAmount] = useState(getPercentage(amount, organRatio));

  const [vegAmount, setVegAmount] = useState(getPercentage(amount, veggieRatio));
  const [seedAmount, setSeedAmount] = useState(getPercentage(amount, seedRatio));
  const [fruitAmount, setFruitAmount] = useState(getPercentage(amount, fruitRatio));
  const [totalVegAmount, setTotalVegAmount] = useState(getPercentage(amount, (veggieRatio + seedRatio + fruitRatio)));
  const [muscleAmount, setMuscleAmount] = useState(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));

  useEffect(() => {
    const bonePerc = customRMB || rmbPercent;

    setBoneAmount(getBoneAmount(amount, boneRatio, bonePerc));
  }, [amount, boneRatio, rmbPercent, customRMB]);

  useEffect(() => {
    setOrganAmount(getPercentage(amount, organRatio));
  }, [amount, organRatio]);

  useEffect(() => {
    setLiverAmount(getPercentage(amount, liverRatio));
  }, [amount, liverRatio]);

  useEffect(() => {
    setVegAmount(getPercentage(amount, veggieRatio));
  }, [amount, veggieRatio]);

  useEffect(() => {
    setSeedAmount(getPercentage(amount, seedRatio));
  }, [amount, seedRatio]);

  useEffect(() => {
    setFruitAmount(getPercentage(amount, fruitRatio));
  }, [amount, fruitRatio]);

  useEffect(() => {
    const totalVeggies = veggieRatio + seedRatio + fruitRatio;
    setTotalVegAmount(getPercentage(amount, totalVeggies));
  }, [amount, veggieRatio, seedRatio, fruitRatio]);

  useEffect(() => {
    setMuscleAmount(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));
    setShowBulkTable(false);
  }, [amount, boneAmount, organAmount, liverAmount, totalVegAmount]);

  return (
    <React.Fragment>
      <AmountsTable 
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
  amount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  customRMB: PropTypes.number.isRequired,
  boneRatio: PropTypes.number.isRequired,
  liverRatio: PropTypes.number.isRequired,
  organRatio: PropTypes.number.isRequired,
  veggieRatio: PropTypes.number.isRequired,
  seedRatio: PropTypes.number.isRequired,
  fruitRatio: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default WhatToFeed;
