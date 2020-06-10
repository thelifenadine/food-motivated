import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getMuscleAmount(amount, boneAmount, otherAmounts)', () => {
  let getMuscleAmount;
  let amount = 32.6;
  let boneAmount = 6;
  let otherAmounts = {
    organ: 1.6,
    liver: 1.6,
    veggie: 3.2,
  };
  
  before(() => {
    getMuscleAmount = proxyquire.noCallThru().load('./getMuscleAmount', {
    }).default;
  });

  it('should get the correct amount', () => {
    const result = getMuscleAmount(amount, boneAmount, otherAmounts);
    result.should.equal(20.200000000000003);
  });
});
