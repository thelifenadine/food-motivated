import proxyquire from 'proxyquire';
import round from './round';
import { should } from "chai";
should();

describe('getBoneAmount(amount, bonePercentage, rmbPercent)', () => {
  let getBoneAmount;

  before(() => {
    getBoneAmount = proxyquire.noCallThru().load('./getBoneAmount', {}).default;
  });

  it('should calculate correctly for test 1', () => {
    const adultBonePercentage = 10;
    const testAmountOunces = 32;
    const duckFeet = 60;

    const result = getBoneAmount(testAmountOunces, adultBonePercentage, duckFeet);
    round(result).should.eql(5.3);
  });

  it('should calculate correctly for test 2', () => {
    const puppyBonePercentage = 17;
    const testAmountGrams = 1250;
    const duckNeck = 50;

    const result = getBoneAmount(testAmountGrams, puppyBonePercentage, duckNeck);
    round(result).should.eql(425);
  });

  it('should calculate correctly for zero bone percentage', () => {
    const puppyBonePercentage = 17;
    const testAmountGrams = 1250;
    const zeroBonePercentage = 0;

    const result = getBoneAmount(testAmountGrams, puppyBonePercentage, zeroBonePercentage);
    round(result).should.eql(0);
  });
});
