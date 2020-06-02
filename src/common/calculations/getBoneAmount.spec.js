import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getBoneAmount(amount, bonePercentage, boneType)', () => {
  let getBoneAmount;
  let defaultBonePercentage = 11;
  let defaultBoneType = 60;
  let defaultTotalAmount = 32.6;
  
  before(() => {
    getBoneAmount = proxyquire.noCallThru().load('./getBoneAmount', {
      // './toPercent': (arg) => (arg / 100),
    }).default;
  });

  it('should get the correct amount', () => {
    const result = getBoneAmount(defaultTotalAmount, defaultBonePercentage, defaultBoneType);
    result.should.equal(6);
  });
});
