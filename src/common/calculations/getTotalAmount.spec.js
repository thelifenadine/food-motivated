import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getTotalAmount(weight, maintenancePercentage, unitAmount)', () => {
  let getTotalAmount;
  let weight = 68;
  let maintenancePercentage = 2.5;
  
  before(() => {
    getTotalAmount = proxyquire.noCallThru().load('./getTotalAmount', {
    }).default;
  });

  it('should get the correct amount in ounces by default', () => {
    const result = getTotalAmount(weight, maintenancePercentage);
    result.should.eql(27.200000000000003);
  });

  it('should get the correct amount in grams if passed in', () => {
    // kg/g example
    const result = getTotalAmount(50, 2.5, 100);
    result.should.equal(125);
  });
});
