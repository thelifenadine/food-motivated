import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getTotalDailyAmount(weight, maintenancePercentage, unitAmount)', () => {
  let getTotalDailyAmount;
  let weight = 68;
  let maintenancePercentage = 2.5;

  before(() => {
    getTotalDailyAmount = proxyquire.noCallThru()
      .load('./getTotalDailyAmount', {}).default;
  });

  it('should get the correct amount in ounces by default', () => {
    getTotalDailyAmount(weight, maintenancePercentage)
      .should.eql(27.200000000000003);
  });

  it('should get the correct amount in grams if passed in', () => {
    // kg/g example
    getTotalDailyAmount(50, 2.5, 100)
      .should.equal(125);
  });
});
