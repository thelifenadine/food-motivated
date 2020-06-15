import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getMuscleAmount(amount, boneAmount, otherAmounts)', () => {
  let getMuscleAmount;
  let getMusclePercentage;
  
  before(() => {
    const file = proxyquire.noCallThru().load('./getMuscleAmount', {});
    getMuscleAmount = file.default;
    getMusclePercentage = file.getMusclePercentage;
  });

  it('the muscle amount should be the total minus all the other amounts', () => {
    let totalDailyAmount = 33;
    let boneAmount = 10;
    let otherAmounts = {
      organ: 2,
      liver: 2,
      veggie: 2,
      fruit: 1,
      seed: 1,
    };
    const result = getMuscleAmount(totalDailyAmount, boneAmount, otherAmounts);
    const { organ, liver, veggie, fruit, seed } = otherAmounts;
    const sum = organ + liver + veggie + fruit + seed + boneAmount;

    result.should.eql(15);
    result.should.eql(totalDailyAmount - sum);
  });

  it('the muscle amount should be 100 minus all the other amounts', () => {
    const bonePercentage = 15;
    let otherPercentages = {
      organ: 5,
      liver: 5,
      veggie: 3,
      fruit: 1,
      seed: 1,
    };
    const result = getMusclePercentage(bonePercentage, otherPercentages);
    const { organ, liver, veggie, fruit, seed } = otherPercentages;
    const sum = organ + liver + veggie + fruit + seed + bonePercentage;

    result.should.eql(70);
    result.should.eql(100 - sum);
  });
});
