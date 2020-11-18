import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Button, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import Header2 from './Header2';
import AmountsTable from './AmountsTable';
import Section from './Section';
import BulkTable from './BulkTable';

const useStyles = makeStyles((theme) => ({
  numericLarge: {
    margin: theme.spacing(1),
    width: 110,
  },
}));

const WhatToFeed = () => {
  const classes = useStyles();
  const {
    totalDailyAmount, unitDetails, boneAmount, muscleAmount, otherAmounts,
    rmbPercent, essentialNutrients, lastSavedLifestage,
  } = useSelector(({ calculator }) => ({
    totalDailyAmount: calculator.totalDailyAmount,
    unitDetails: calculator.unitDetails,
    boneAmount: calculator.boneAmount,
    muscleAmount: calculator.muscleAmount,
    otherAmounts: calculator.otherAmounts,
    rmbPercent: calculator.rmbPercent,
    essentialNutrients: calculator.essentialNutrients,
    lastSavedLifestage: calculator.lastSavedLifestage,
  }), shallowEqual);


  const [shouldShowBulkTable, setShowBulkTable] = useState(false);
  const [numDays, setNumDays] = useState(7);

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
        essentialNutrients={essentialNutrients}
        lastSavedLifestage={lastSavedLifestage}
        title="What to feed each day"
      />
      <div className={classes.bulkTable}>
        <Section>
          <Header2>Bulk Helper</Header2>
          <div>
            <TextField
              className={classes.numericLarge}
              id="numDays"
              label="How long"
              value={numDays}
              type="number"
              onChange={e => setNumDays(e.target.value)}
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
          </div>
        </Section>
        {shouldShowBulkTable && (numDays > 1) &&
          <BulkTable
            totalDailyAmount={totalDailyAmount}
            muscleAmount={muscleAmount}
            boneAmount={boneAmount}
            rmbPercent={rmbPercent}
            otherAmounts={otherAmounts}
            unitDetails={unitDetails}
            essentialNutrients={essentialNutrients}
            lastSavedLifestage={lastSavedLifestage}
            numDays={+numDays}
          />
        }
      </div>
    </React.Fragment>
  );
};

export default WhatToFeed;
