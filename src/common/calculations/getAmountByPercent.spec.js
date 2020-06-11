import mapValues from 'lodash/mapValues';
import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getAmountByPercent(amount, percentAmount)', () => {
  let getAmountByPercent;
  
  const totalDailyAmount = 32.6;
  
  before(() => {
    getAmountByPercent = proxyquire.noCallThru().load('./getAmountByPercent', {
      './toPercent': (arg) => (arg / 100),
    }).default;
  });

  it('barf adult percentages should map to correct amounts', () => {
    const barfPercentages = {
      liver: 5,
      organ: 5,
      veggie: 7,
      seed: 2,
      fruit: 1,
    };

    mapValues(barfPercentages, value => getAmountByPercent(totalDailyAmount, value)).should.eql({
      fruit: 0.326,
      liver: 1.6300000000000001,
      organ: 1.6300000000000001,
      seed: 0.652,
      veggie: 2.2820000000000005,
    });
  });

  it('barf puppy should map to correct amounts', () => {
    const barfPuppyPercentages = {
      liver: 7,
      organ: 7,
      veggie: 7,
      seed: 2,
      fruit: 1,
    };

    mapValues(barfPuppyPercentages, value => getAmountByPercent(totalDailyAmount, value)).should.eql({
      fruit: 0.326,
      liver: 2.2820000000000005,
      organ: 2.2820000000000005,
      seed: 0.652,
      veggie: 2.2820000000000005,
    });
  });

  it('pmr adult should map to correct amounts', () => {
    const pmrPercentages = {
      liver: 5,
      organ: 5,
    };

    mapValues(pmrPercentages, value => getAmountByPercent(totalDailyAmount, value)).should.eql({
      liver: 1.6300000000000001,
      organ: 1.6300000000000001,
    });
  });

  it('pmr puppy should map to correct amounts', () => {
    const pmrPercentages = {
      liver: 7,
      organ: 7,
      fibre: 1,
    };

    mapValues(pmrPercentages, value => getAmountByPercent(totalDailyAmount, value)).should.eql({
      liver: 2.2820000000000005,
      organ: 2.2820000000000005,
      fibre: 0.326,
    });
  });
});
