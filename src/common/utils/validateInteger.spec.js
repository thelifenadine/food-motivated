import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('validateInteger(value', () => {
  let validateInteger;

  before(() => {
    validateInteger = proxyquire.noCallThru()
      .load('./validateInteger', {})
      .default;
  });

  it('should return a number when passed a number in a string', () => {
    validateInteger('12').should.eql(12);
  });

  it('should ignore decimal values', () => {
    validateInteger('12.12').should.eql(12);
  });

  it('should ignore letters after', () => {
    validateInteger('12aa').should.eql(12);
  });

  it('should return zero if cannot parse the number', () => {
    validateInteger('aaa').should.eql(0);
  });
});
