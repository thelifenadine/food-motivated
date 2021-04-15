import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Button, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import { Translate } from 'react-localize-redux';

import Header2 from '../layout/Header2';
import Section from '../layout/Section';

import BulkTable from './BulkTable';
import AmountsTable from './AmountsTable';
import validateInteger from '../../utils/validateInteger';

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

  const amountsTableProps = {
    totalDailyAmount: totalDailyAmount,
    muscleAmount: muscleAmount,
    boneAmount: boneAmount,
    rmbPercent: rmbPercent,
    otherAmounts: otherAmounts,
    unitDetails: unitDetails,
    essentialNutrients: essentialNutrients,
    lastSavedLifestage: lastSavedLifestage,
  };

  return (
    <Translate>
      {({ translate }) => (
        <React.Fragment>
          <AmountsTable
            {...amountsTableProps}
            title={translate('whatToFeed.what-to-feed-each-day')}
          />
          <div className={classes.bulkTable}>
            <Section>
              <Header2>{translate('whatToFeed.bulk-helper')}</Header2>
              <div>
                <TextField
                  className={classes.numericLarge}
                  id="numDays"
                  label={translate('whatToFeed.how-long')}
                  value={numDays}
                  type="number"
                  onChange={e => setNumDays(e.target.value)}
                  onFocus={(event) => event.target.select()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{translate('whatToFeed.days')}</InputAdornment>
                    ),
                  }}
                  helperText={translate('whatToFeed.minimum-of-2-days')}
                />
                <Button
                  data-testid="showBulkTableButton"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowBulkTable(true)}
                >
                  {translate('whatToFeed.generate')}
                </Button>
              </div>
            </Section>
            {shouldShowBulkTable && (numDays > 1) &&
              <BulkTable
                {...amountsTableProps}
                numDays={validateInteger(numDays)}
                bulkTitle={translate('whatToFeed.bulk-title', {
                  numDays
                })}
              />
            }
          </div>
        </React.Fragment>
      )}
    </Translate>
  );
};

export default WhatToFeed;
