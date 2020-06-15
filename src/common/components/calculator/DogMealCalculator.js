import React from 'react';
import { Grid } from '@material-ui/core';

import WhatToFeed from './WhatToFeed';
import RawMeatyBone from './RawMeatyBone';
import BasicOptions from './BasicOptions';
import PercentageOptions from './PercentageOptions';
import Header2 from './Header2';
import Section from './Section';

const DogMealCalculator = () => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <Section>
        <Header2>Dog Raw Food Calculator - Recipe Helper</Header2>
      </Section>
      <BasicOptions />
      <PercentageOptions />
      <RawMeatyBone />
    </Grid>
    <Grid item xs={12} md={6}>
      <WhatToFeed />
    </Grid>
  </Grid>
);

export default DogMealCalculator;
