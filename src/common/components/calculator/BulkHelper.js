import mapValues from 'lodash/mapValues';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AmountsTable from './AmountsTable';
import { Button, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import Header2 from './Header2';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  numericLarge: {
    margin: theme.spacing(1),
    width: 110,
  },
  bulkTable: {
    marginBottom: 50,
  }
}));

const BulkHelper = (props) => {
  const {
    totalDailyAmount,
    muscleAmount,
    boneAmount,
    otherAmounts,
    unitDetails,
    rmbPercent,
    setShowBulkTable,
    shouldShowBulkTable,
  } = props;

  const classes = useStyles();
  const [numDays, setNumDays] = useState(7);

  const [totalAmountUpdated, setTotalUpdatedAmount] = useState(totalDailyAmount);
  const [boneAmountUpdated, setBoneUpdatedAmount] = useState(boneAmount);
  const [otherAmountsUpdated, setOtherUpdatedAmount] = useState(otherAmounts);
  const [muscleAmountUpdated, setMuscleUpdatedAmount] = useState(muscleAmount);

  useEffect(() => {
    const updatedOther = mapValues(otherAmounts, value => value * numDays);
    setTotalUpdatedAmount(totalDailyAmount * numDays);
    setOtherUpdatedAmount(updatedOther);
    setBoneUpdatedAmount(boneAmount * numDays);
    setMuscleUpdatedAmount(muscleAmount * numDays);
  }, [numDays]);

  const handleButtonClick = () => {
    // TODO: scroll down
    setShowBulkTable(true);
  };

  return (
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
            onClick={handleButtonClick}
          >
            Generate
          </Button>
        </div>
      </Section>
      {shouldShowBulkTable && (numDays > 1) &&
        <AmountsTable
          totalAmount={totalAmountUpdated}
          muscleAmount={muscleAmountUpdated}
          boneAmount={boneAmountUpdated}
          otherAmounts={otherAmountsUpdated}
          unitDetails={unitDetails}
          rmbPercent={rmbPercent}
          title={`Bulk Amounts for ${numDays} days`}
        />
      }
    </div>
  );
};

BulkHelper.propTypes = {
  totalDailyAmount: PropTypes.number.isRequired,
  muscleAmount: PropTypes.number.isRequired,
  boneAmount: PropTypes.number.isRequired,
  rmbPercent: PropTypes.number.isRequired,
  otherAmounts: PropTypes.object.isRequired,
  unitDetails: PropTypes.object.isRequired,
  shouldShowBulkTable: PropTypes.bool.isRequired,
  setShowBulkTable: PropTypes.func.isRequired,
};

export default BulkHelper;
