import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AmountsTable from './AmountsTable';
import BulkHelper from './BulkHelper';
import getBoneAmount from '../../calculations/getBoneAmount';
import getMuscleAmount from '../../calculations/getMuscleAmount';
import getAmountByPercent from '../../calculations/getAmountByPercent.js';

const WhatToFeed = (props) => {
  const { 
    amount,
    rmbPercent,
    bonePercentage, 
    organPercentage, 
    liverPercentage, 
    veggiePercentage,
    seedPercentage,
    fruitPercentage,
    unitDetails,
  } = props;

  const [shouldShowBulkTable, setShowBulkTable] = useState(false);

  const [boneAmount, setBoneAmount] = useState(getBoneAmount(amount, bonePercentage, rmbPercent));
  const [liverAmount, setLiverAmount] = useState(getAmountByPercent(amount, liverPercentage));
  const [organAmount, setOrganAmount] = useState(getAmountByPercent(amount, organPercentage));

  const [vegAmount, setVegAmount] = useState(getAmountByPercent(amount, veggiePercentage));
  const [seedAmount, setSeedAmount] = useState(getAmountByPercent(amount, seedPercentage));
  const [fruitAmount, setFruitAmount] = useState(getAmountByPercent(amount, fruitPercentage));
  const [totalVegAmount, setTotalVegAmount] = useState(getAmountByPercent(amount, (veggiePercentage + seedPercentage + fruitPercentage)));
  const [muscleAmount, setMuscleAmount] = useState(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));

  useEffect(() => {
    setBoneAmount(getBoneAmount(amount, bonePercentage, rmbPercent));
  }, [amount, bonePercentage, rmbPercent]);

  useEffect(() => {
    setOrganAmount(getAmountByPercent(amount, organPercentage));
  }, [amount, organPercentage]);

  useEffect(() => {
    setLiverAmount(getAmountByPercent(amount, liverPercentage));
  }, [amount, liverPercentage]);

  useEffect(() => {
    setVegAmount(getAmountByPercent(amount, veggiePercentage));
  }, [amount, veggiePercentage]);

  useEffect(() => {
    setSeedAmount(getAmountByPercent(amount, seedPercentage));
  }, [amount, seedPercentage]);

  useEffect(() => {
    setFruitAmount(getAmountByPercent(amount, fruitPercentage));
  }, [amount, fruitPercentage]);

  useEffect(() => {
    const totalVeggies = veggiePercentage + seedPercentage + fruitPercentage;
    setTotalVegAmount(getAmountByPercent(amount, totalVeggies));
  }, [amount, veggiePercentage, seedPercentage, fruitPercentage]);

  useEffect(() => {
    setMuscleAmount(getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount));
    setShowBulkTable(false);
  }, [amount, boneAmount, organAmount, liverAmount, totalVegAmount]);

  return (
    <React.Fragment>
      <AmountsTable 
        totalAmount={amount}
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
        totalAmount={amount}
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
  bonePercentage: PropTypes.number.isRequired,
  liverPercentage: PropTypes.number.isRequired,
  organPercentage: PropTypes.number.isRequired,
  veggiePercentage: PropTypes.number.isRequired,
  seedPercentage: PropTypes.number.isRequired,
  fruitPercentage: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
};

export default WhatToFeed;
