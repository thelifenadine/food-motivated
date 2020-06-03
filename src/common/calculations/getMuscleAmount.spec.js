import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getMuscleAmount(amount, boneAmount, organAmount, liverAmount, totalVegAmount)', () => {
  let getMuscleAmount;
  let amount = 32.6;
  let boneAmount = 6;
  let organAmount = 1.6;
  let liverAmount = 1.6;
  let totalVegAmount = 3.2;
  
  before(() => {
    getMuscleAmount = proxyquire.noCallThru().load('./getMuscleAmount', {
    }).default;
  });

  it('should get the correct amount', () => {
    const result = getMuscleAmount(amount, [boneAmount, organAmount, liverAmount, totalVegAmount]);
    result.should.equal(20.200000000000003);
  });
});
