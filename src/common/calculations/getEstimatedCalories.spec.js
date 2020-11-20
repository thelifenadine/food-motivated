import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('getEstimatedCalories(amountPer1000kCal, totalAmount)', () => {
  let getEstimatedCalories;

  const gramsPer1000kcal = 538;
  const ouncesPer1000kcal = 19;

  before(() => {
    getEstimatedCalories = proxyquire.noCallThru()
      .load('./getEstimatedCalories', {})
      .default;
  });

  describe('the metric and english equivalents should approximately match', () => {
    const totalAmountInGrams = 720;
    const totalAmountInOunces = 25.44;

    it('should calculate about 1338 for grams', () => {
      getEstimatedCalories(gramsPer1000kcal, totalAmountInGrams)
        .should.eql(1338.2899628252787);
    });

    it('should calculate about 1338 for ounces', () => {
      getEstimatedCalories(ouncesPer1000kcal, totalAmountInOunces)
        .should.eql(1338.9473684210527);
    });
  });
});
