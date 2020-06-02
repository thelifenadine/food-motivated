import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getAmountByPercent(amount, percentAmount)', () => {
  let getAmountByPercent;
  
  before(() => {
    getAmountByPercent = proxyquire.noCallThru().load('./getAmountByPercent', {
      './getAmountByPercent': (arg) => (arg / 100),
    }).default;
  });

  it('should get the percentage of the amount - muscle', () => {
    getAmountByPercent(32, 65).should.equal(20.8);
  });

  it('should get the percentage of the amount - veggie', () => {
    getAmountByPercent(32, 15).should.equal(4.8);
  });

  it('should get the percentage of the amount - organ', () => {
    getAmountByPercent(32, 5).should.equal(1.6);
  });
});
