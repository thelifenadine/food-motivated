import React from 'react';
import { Grid } from '@material-ui/core';
import { Translate } from 'react-localize-redux';

import WhatToFeed from './WhatToFeed';
import RawMeatyBone from './RawMeatyBone';
import BasicOptions from './BasicOptions';
import PercentageOptions from './PercentageOptions';
import Header2 from '../layout/Header2';
import Section from '../layout/Section';
import Contact from '../footer/Contact';

const Main = () => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <Section>
        <Header2>
          <Translate id="main.header" />
        </Header2>
      </Section>
      <BasicOptions />
      <PercentageOptions />
      <RawMeatyBone />
    </Grid>
    <Grid item xs={12} md={6}>
      <WhatToFeed />
      <Contact />
    </Grid>
  </Grid>
);

export default Main;
