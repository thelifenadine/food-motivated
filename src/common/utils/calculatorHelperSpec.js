import { expect } from "chai";
import { 
  round,
  // getPercentage,
  // getAmountPercentage,
  // getRoundedAmount,
  // getBoneAmount,
  // getMuscleAmount,
} from "./calculatorHelper";

// just a wrapper for lodash/round that defaults the decimal place to 1
describe('round()', () => {
  it('should round 1.678 to 1.7', () => {
    expect(round(1.678)).to.equal(1.7);
  });

  it('should not round 1.567 to 1.5', () => {
    expect(round(1.567)).to.not.equal(1.5);
  });
});
