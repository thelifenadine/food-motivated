import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import round from '../../calculations/round';
import DailyTable from './DailyTable';

const BulkTable = (props) => {
  const { 
    muscleAmount,
    boneAmount,
    liverAmount,
    organAmount,
    vegAmount,
    seedAmount,
    fruitAmount,
    totalVegAmount,
    unitDetails,
    numDays,
    title
  } = props;

  const [boneUpdatedAmount, setBoneUpdatedAmount] = useState(boneAmount);
  const [liverUpdatedAmount, setLiverUpdatedAmount] = useState(liverAmount);
  const [organUpdatedAmount, setOrganUpdatedAmount] = useState(organAmount);

  const [vegUpdatedAmount, setVegUpdatedAmount] = useState(vegAmount);
  const [seedUpdatedAmount, setSeedUpdatedAmount] = useState(seedAmount);
  const [fruitUpdatedAmount, setFruitUpdatedAmount] = useState(fruitAmount);
  const [totalVegUpdatedAmount, setTotalVegUpdatedAmount] = useState(totalVegAmount);
  const [muscleUpdatedAmount, setMuscleUpdatedAmount] = useState(muscleAmount);

  useEffect(() => {
    setBoneUpdatedAmount(round(boneAmount * numDays));
    setLiverUpdatedAmount(round(liverAmount * numDays));
    setOrganUpdatedAmount(round(organAmount * numDays));
    setVegUpdatedAmount(round(vegAmount * numDays));
    setSeedUpdatedAmount(round(seedAmount * numDays));
    setFruitUpdatedAmount(round(fruitAmount * numDays));
    setTotalVegUpdatedAmount(round(totalVegAmount * numDays));
    setMuscleUpdatedAmount(round(muscleAmount * numDays));
  }, [numDays]);

  return (
    <DailyTable 
      muscleAmount={muscleUpdatedAmount}
      boneAmount={boneUpdatedAmount}
      liverAmount={liverUpdatedAmount}
      organAmount={organUpdatedAmount}
      vegAmount={vegUpdatedAmount}
      seedAmount={seedUpdatedAmount}
      fruitAmount={fruitUpdatedAmount}
      totalVegAmount={totalVegUpdatedAmount}
      unitDetails={unitDetails}
      title={title}
    />   
  );
};

BulkTable.propTypes = {
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  liverAmount: PropTypes.number.isRequired,
  organAmount: PropTypes.number.isRequired,
  vegAmount: PropTypes.number.isRequired,
  seedAmount: PropTypes.number.isRequired,
  fruitAmount: PropTypes.number.isRequired,
  totalVegAmount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  numDays: PropTypes.number.isRequired,
};

export default BulkTable;
