import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getPercentage(amount, percentAmount)', () => {
  let getPercentage;
  
  before(() => {
    getPercentage = proxyquire.noCallThru().load('./getPercentage', {
      './getPercentage': (arg) => (arg / 100),
    }).default;
  });

  it('should get the percentage of the amount - muscle', () => {
    getPercentage(32, 65).should.equal(20.8);
  });

  it('should get the percentage of the amount - veggie', () => {
    getPercentage(32, 15).should.equal(4.8);
  });

  it('should get the percentage of the amount - organ', () => {
    getPercentage(32, 5).should.equal(1.6);
  });
});
