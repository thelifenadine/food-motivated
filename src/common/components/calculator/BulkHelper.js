import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import round from '../../calculations/round';
import AmountsTable from './AmountsTable';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import useStyles from '../../styles/useStyles';
import Header2 from './Header2';
import Section from './Section';

const BulkHelper = (props) => {
  const { 
    totalAmount,
    muscleAmount,
    boneAmount,
    liverAmount,
    organAmount,
    vegAmount,
    seedAmount,
    fruitAmount,
    unitDetails,
    rmbPercent,
    setShowBulkTable,
    shouldShowBulkTable,
  } = props;

  const classes = useStyles();
  const [numDays, setNumDays] = useState(7);

  const [totalUpdatedAmount, setTotalUpdatedAmount] = useState(totalAmount);
  const [boneUpdatedAmount, setBoneUpdatedAmount] = useState(boneAmount);
  const [liverUpdatedAmount, setLiverUpdatedAmount] = useState(liverAmount);
  const [organUpdatedAmount, setOrganUpdatedAmount] = useState(organAmount);

  const [vegUpdatedAmount, setVegUpdatedAmount] = useState(vegAmount);
  const [seedUpdatedAmount, setSeedUpdatedAmount] = useState(seedAmount);
  const [fruitUpdatedAmount, setFruitUpdatedAmount] = useState(fruitAmount);
  const [muscleUpdatedAmount, setMuscleUpdatedAmount] = useState(muscleAmount);

  /* eslint ignore react-hooks/exhaustive-deps */
  useEffect(() => {
    setTotalUpdatedAmount(round(totalAmount * numDays));
    setBoneUpdatedAmount(round(boneAmount * numDays));
    setBoneUpdatedAmount(round(boneAmount * numDays));
    setLiverUpdatedAmount(round(liverAmount * numDays));
    setOrganUpdatedAmount(round(organAmount * numDays));
    setVegUpdatedAmount(round(vegAmount * numDays));
    setSeedUpdatedAmount(round(seedAmount * numDays));
    setFruitUpdatedAmount(round(fruitAmount * numDays));
    setMuscleUpdatedAmount(round(muscleAmount * numDays));
  }, [numDays]);

  return (
    <React.Fragment>
      <Section> 
        <Header2>Bulk Helper</Header2>
        <TextField
          className={classes.numericLarge}
          id="numDays" 
          label="How long"
          value={numDays}
          type="number"
          onChange={e => setNumDays(Number(e.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">days</InputAdornment>
            ),
          }}
          helperText="minimum of 2 days"
        />
        
        <Button 
          size="small"
          variant="outlined"
          color="secondary" 
          onClick={() => setShowBulkTable(true)}
        >
          Generate
        </Button>
      </Section> 
      {shouldShowBulkTable && (numDays > 1) &&
        <Section> 
          <AmountsTable 
            totalAmount={totalUpdatedAmount}
            muscleAmount={muscleUpdatedAmount}
            boneAmount={boneUpdatedAmount}
            liverAmount={liverUpdatedAmount}
            organAmount={organUpdatedAmount}
            vegAmount={vegUpdatedAmount}
            seedAmount={seedUpdatedAmount}
            fruitAmount={fruitUpdatedAmount}
            unitDetails={unitDetails}
            rmbPercent={rmbPercent}
            title={`Bulk Amounts for ${numDays} days`}
          />  
        </Section>
      }
    </React.Fragment>
  );
};

BulkHelper.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  liverAmount: PropTypes.number.isRequired,
  organAmount: PropTypes.number.isRequired,
  vegAmount: PropTypes.number.isRequired,
  seedAmount: PropTypes.number.isRequired,
  fruitAmount: PropTypes.number.isRequired,
  unitDetails: PropTypes.object.isRequired,
  shouldShowBulkTable: PropTypes.bool.isRequired,
  setShowBulkTable: PropTypes.func.isRequired,
};

export default BulkHelper;
