import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getBulkOther(otherAmounts, numberOfDays)', () => {
  let getBulkOther;

  before(() => {
    getBulkOther = proxyquire.noCallThru()
      .load('./getBulkOther', {})
      .default;
  });

  it('should multiply each amount by 1', () => {
    getBulkOther({
      whateverIDecide: 80,
      liver: 1.4,
      organ: 1.4,
      veggie: 2,
    }, 1).should.eql({
      whateverIDecide: 80,
      liver: 1.4,
      organ: 1.4,
      veggie: 2,
    });
  });

  it('should multiply each amount by 7', () => {
    getBulkOther({
      liver: 1.4,
      organ: 1.4,
      veggie: 2,
    }, 7).should.eql({
      liver: 9.799999999999999,
      organ: 9.799999999999999,
      veggie: 14,
    });
  });
});
