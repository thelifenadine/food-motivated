import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getBoneAmount(amount, boneRatio, boneType)', () => {
  let getBoneAmount;
  let defaultBoneRatio = 11;
  let defaultBoneType = 60;
  let defaultTotalAmount = 32.6;
  
  before(() => {
    getBoneAmount = proxyquire.noCallThru().load('./getBoneAmount', {
      // './toPercent': (arg) => (arg / 100),
    }).default;
  });

  it('should get the correct amount', () => {
    const result = getBoneAmount(defaultTotalAmount, defaultBoneRatio, defaultBoneType);
    result.should.equal(6);
  });
});
