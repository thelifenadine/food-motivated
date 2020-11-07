import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const settings = useSelector(state => state.calculator);
  const {
    totalDailyAmount, unitDetails, boneAmount, muscleAmount, otherAmounts,
    rmbPercent, essentialNutrients
  } = settings;
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
            numDays={numDays}
          />
        }
      </div>
    </React.Fragment>
  );
};

export default WhatToFeed;
