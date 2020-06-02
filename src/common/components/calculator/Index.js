import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import WhatToFeed from './WhatToFeed';
import RawMeatyBone from './RawMeatyBone';
import BasicOptions from './BasicOptions';
import PercentageOptions from './PercentageOptions';
import getTotalAmount from '../../calculations/getTotalAmount';
import rmbOptions from '../../form/rawMeatyBoneOptions';
import { ratioDefaultData } from '../../form/ratioDefaultOptions';
import { unitData } from '../../form/unitOptions';

const GridColumn = props => (<Grid item xs={12} sm={6} {...props} />);

const Index = () => {
  const [weight, setWeight] = useState(68);
  const [maintenance, setMaintenance] = useState(2.5);
  const [age, setAge] = useState('barfAdult');

  const [musclePercentage, setMusclePercentage] = useState(ratioDefaultData[age].muscle);
  const [bonePercentage, setBonePercentage] = useState(ratioDefaultData[age].bone);
  const [liverPercentage, setLiverPercentage] = useState(ratioDefaultData[age].liver);
  const [organPercentage, setOrganPercentage] = useState(ratioDefaultData[age].organ);
  const [veggiePercentage, setVeggiePercentage] = useState(ratioDefaultData[age].veggie);
  const [seedPercentage, setSeedPercentage] = useState(ratioDefaultData[age].seed);
  const [fruitPercentage, setFruitPercentage] = useState(ratioDefaultData[age].fruit);

  const [customRMB, setCustomRMB] = useState(0);
  const [rmbOption, setRmbOption] = useState(rmbOptions[0].value);
  const [rmbPercent, setRmbPercent] = useState(rmbOption);
  const [unit, setUnit] = useState('english');
  const [unitDetails, setUnitDetails] = useState(unitData[unit]);
  const [amount, setAmount] = useState(getTotalAmount(weight, maintenance, unitDetails.perUnit));
  
  useEffect(() => {
    const bonePerc = (rmbOption === 0) ? customRMB : rmbOption;

    setRmbPercent(bonePerc);
  }, [rmbOption, customRMB]);

  useEffect(() => {
    setAmount(getTotalAmount(weight, maintenance, unitDetails.perUnit));
  }, [weight, maintenance, unitDetails]);

  useEffect(() => {
    setUnitDetails(unitData[unit]);
  }, [unit]);

  useEffect(() => {
    setBonePercentage(ratioDefaultData[age].bone);
    setLiverPercentage(ratioDefaultData[age].liver);
    setOrganPercentage(ratioDefaultData[age].organ);
    setVeggiePercentage(ratioDefaultData[age].veggie);
    setSeedPercentage(ratioDefaultData[age].seed);
    setFruitPercentage(ratioDefaultData[age].fruit);
  }, [age]);

  useEffect(() => {
    const newMusclePercentage = 100 - (bonePercentage + liverPercentage + organPercentage + veggiePercentage + seedPercentage + fruitPercentage);
    setMusclePercentage(newMusclePercentage);
  }, [bonePercentage, liverPercentage, organPercentage, veggiePercentage, seedPercentage, fruitPercentage]);

  return (
    <Grid container spacing={1}>
      <GridColumn>
        <BasicOptions 
          setUnit={setUnit}
          weight={weight}
          setWeight={setWeight}
          maintenance={maintenance}
          setMaintenance={setMaintenance}
          amount={amount}
          unitDetails={unitDetails}
        />
        <PercentageOptions      
          setAge={setAge}
          musclePercentage={musclePercentage}
          bonePercentage={bonePercentage}
          setBonePercentage={setBonePercentage}
          liverPercentage={liverPercentage}
          setLiverPercentage={setLiverPercentage}
          organPercentage={organPercentage}
          setOrganPercentage={setOrganPercentage}
          veggiePercentage={veggiePercentage}
          setVeggiePercentage={setVeggiePercentage}
          seedPercentage={seedPercentage}
          setSeedPercentage={setSeedPercentage}
          fruitPercentage={fruitPercentage}
          setFruitPercentage={setFruitPercentage}
        />
        <RawMeatyBone
          setRmbOption={setRmbOption}
          setCustomRMB={setCustomRMB}
          rmbOption={rmbOption}
          customRMB={customRMB}
          rmbOptions={rmbOptions}
        />
      </GridColumn>
      <GridColumn>
        <WhatToFeed 
          amount={amount}
          rmbPercent={rmbPercent}
          bonePercentage={bonePercentage}
          organPercentage={organPercentage}
          liverPercentage={liverPercentage}
          veggiePercentage={veggiePercentage}
          seedPercentage={seedPercentage}
          fruitPercentage={fruitPercentage}
          unitDetails={unitDetails}
        />
      </GridColumn>
    </Grid>
  );
};

export default Index;