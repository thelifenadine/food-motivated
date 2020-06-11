import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getMuscleAmount(amount, boneAmount, otherAmounts)', () => {
  let getMuscleAmount;
  let totalDailyAmount = 33;
  let boneAmount = 10;
  let otherAmounts = {
    organ: 2,
    liver: 2,
    veggie: 2,
    fruit: 1,
    seed: 1,
  };
  
  before(() => {
    getMuscleAmount = proxyquire.noCallThru().load('./getMuscleAmount', {
    }).default;
  });

  it('the muscle amount should be the total minus all the other amounts', () => {
    const result = getMuscleAmount(totalDailyAmount, boneAmount, otherAmounts);
    const { organ, liver, veggie, fruit, seed } = otherAmounts;
    const sum = organ + liver + veggie + fruit + seed + boneAmount;

    result.should.eql(15);
    result.should.eql(totalDailyAmount - sum);
  });
});
