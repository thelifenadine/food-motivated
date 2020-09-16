import proxyquire from 'proxyquire';
import { expect, should } from "chai";
should();

// wrapper for lodash/round that defaults the decimal place to 1
describe('round()', () => {
  let round;

  before(() => {
    round = proxyquire.noCallThru().load('./round', {
    }).default;
  });

  it('should round 1.678 to 1.7', () => {
    expect(round(1.678)).to.equal(1.68);
  });

  it('should not round 1.567 to 1.5', () => {
    expect(round(1.567)).to.not.equal(1.5);
  });
});
